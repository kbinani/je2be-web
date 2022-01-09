import {
  CompactionProgressDeltaMessage,
  CompactionQueueMessage,
  CompactionThreadFinishedMessage,
  ConvertRegionDoneMessage,
  ConvertRegionMessage,
  isCompactionQueueMessage,
  isConvertRegionMessage,
} from "../../share/messages";
import { readI32, writeI32 } from "../../share/heap";
import {
  exists,
  mkdirp,
  mount,
  readFile,
  unlink,
  unmount,
} from "../../share/fs-ext";
import { KvsClient } from "../../share/kvs";

self.importScripts("./region-wasm.js");

self.addEventListener("message", (ev: MessageEvent) => {
  if (isConvertRegionMessage(ev.data)) {
    startConvertRegion(ev.data);
  } else if (isCompactionQueueMessage(ev.data)) {
    startCompaction(ev.data);
  }
});

const sKvs = new KvsClient();

function startConvertRegion(m: ConvertRegionMessage) {
  convertRegion(m).catch(console.error);
}

async function convertRegion(m: ConvertRegionMessage): Promise<void> {
  const { id, rx, rz, dim, chunks, javaEditionMap } = m;
  const root = `/je2be/${id}/in`;
  let worldDir: string;
  switch (dim) {
    case 2:
      worldDir = `${root}/DIM1`;
      break;
    case 1:
      worldDir = `${root}/DIM-1`;
      break;
    case 0:
    default:
      worldDir = `${root}`;
      break;
  }

  mkdirp(`${worldDir}/region`);
  const files: File[] = [];
  for (const chunk of chunks) {
    const { cx, cz } = chunk;
    const name = `${worldDir}/region/c.${cx}.${cz}.nbt.z`;
    const file = await sKvs.file(name);
    if (!file) {
      console.warn(`[region] (${id}) ${name} not found`);
      return;
    }
    const renamed = `region/c.${cx}.${cz}.nbt.z`;
    files.push(new File([file], renamed));
  }

  const entities = `${worldDir}/entities/r.${rx}.${rz}.mca`;
  const entitiesFile = await sKvs.file(entities);
  if (entitiesFile) {
    const renamed = `entities/r.${rx}.${rz}.mca`;
    files.push(new File([entitiesFile], renamed));
  }

  mkdirp("/wfs");
  mount("worker", "/wfs", { files });

  const storage = Module._malloc(javaEditionMap.length * 4);
  for (let i = 0; i < javaEditionMap.length; i++) {
    writeI32(storage + i, javaEditionMap[i]);
  }
  const ldbDir = `/je2be/${id}/ldb/${dim}`;
  mkdirp(ldbDir);
  const wdDir = `/je2be/${id}/wd/${dim}`;
  mkdirp(wdDir);
  const numLdbFilesPtr = Module._malloc(4);
  writeI32(numLdbFilesPtr, 0);
  const ok = Module.ConvertRegion(
    id,
    "/wfs",
    rx,
    rz,
    dim,
    storage,
    javaEditionMap.length,
    numLdbFilesPtr
  );
  const numLdbFiles = readI32(numLdbFilesPtr);
  if (!ok) {
    unmount("/wfs");
    return;
  }
  const copy: Promise<void>[] = [];
  for (let i = 0; i < numLdbFiles; i++) {
    for (const path of [
      `${ldbDir}/r.${rx}.${rz}.${i}.keys`,
      `${ldbDir}/r.${rx}.${rz}.${i}.values`,
    ]) {
      const data = readFile(path);
      copy.push(sKvs.put(path, data));
    }
  }
  {
    const path = `${wdDir}/r.${rx}.${rz}.nbt`;
    const data = readFile(path);
    copy.push(sKvs.put(path, data));
  }
  await Promise.all(copy);
  const del: Promise<void>[] = [];
  for (let x = 1; x <= 30; x++) {
    for (let z = 1; z <= 30; z++) {
      const cx = rx * 32 + x;
      const cz = rz * 32 + z;
      const name = `${worldDir}/region/c.${cx}.${cz}.nbt.z`;
      del.push(sKvs.del(name));
    }
  }
  await Promise.all(del);
  Module.RemoveAll(`/je2be`);
  unmount("/wfs");
  const done: ConvertRegionDoneMessage = { type: "region_done", id };
  self.postMessage(done);
}

function startCompaction(m: CompactionQueueMessage) {
  const { id, index } = m;
  compaction(m).then(() => {
    const m: CompactionThreadFinishedMessage = {
      type: "compaction_thread_finished",
      index,
      id,
    };
    self.postMessage(m);
  });
}

async function compaction(m: CompactionQueueMessage): Promise<boolean> {
  const { id, keys, index } = m;

  mkdirp("/wfs");
  const names = [...new Set<string>(keys.map((key) => key.file))];
  const files = await Promise.all(names.map(async (path) => sKvs.file(path)));
  const map = new Map<string, string>();
  const option: File[] = [];
  let count = 0;
  for (const file of files) {
    const name = `${count}.bin`;
    const path = `/wfs/${name}`;
    const renamed = new File([file], name);
    option.push(renamed);
    count++;
    map.set(file.name, path);
  }
  mount("worker", "/wfs", { files: option });

  const db = Module.NewAppendDb(id);

  let keyBufferSize = 16;
  let keyBuffer = Module._malloc(keyBufferSize);
  let ok = true;
  let tableNumber = 0;
  let maxTableNumber = 0;

  for (const key of keys) {
    if (keyBufferSize < key.key.byteLength) {
      Module._free(keyBuffer);
      keyBufferSize = key.key.byteLength;
      keyBuffer = Module._malloc(keyBufferSize);
    }
    for (let i = 0; i < key.key.length; i++) {
      Module.HEAPU8[keyBuffer + i] = key.key[i];
    }
    const renamed = map.get(key.file);
    // int AppendDbAppend(intptr_t dbPtr, string file, int pos, intptr_t keyPtr, int keySize) {
    const tn = Module.AppendDbAppend(
      db,
      renamed,
      key.pos,
      keyBuffer,
      key.key.length
    );
    if (tn < 0) {
      console.log(`[post] wasm::Append failed`);
      ok = false;
      break;
    }
    maxTableNumber = Math.max(maxTableNumber, tn);
    for (let i = tableNumber + 1; i <= maxTableNumber; i++) {
      const path = `/je2be/${id}/out/db/${tableName(i)}`;
      const data = readFile(path);
      const p = `/je2be/${id}/out/db/${index}_${i}.ldb`;
      await sKvs.put(p, data);
      unlink(path);
    }
    tableNumber = maxTableNumber;
    const m: CompactionProgressDeltaMessage = {
      type: "compaction_progress_delta",
      id,
      delta: 1,
    };
    self.postMessage(m);
  }

  ok = Module.DeleteAppendDb(db) && ok;

  for (let i = tableNumber + 1; ; i++) {
    const path = `/je2be/${id}/out/db/${tableName(i)}`;
    if (!exists(path)) {
      break;
    }
    const data = readFile(path);
    const p = `/je2be/${id}/out/db/${index}_${i}.ldb`;
    await sKvs.put(p, data);
    unlink(path);
  }

  {
    const path = `/je2be/${id}/out/db/MANIFEST-000001`;
    const p = `/je2be/${id}/out/db/${index}.manifest`;
    const data = readFile(path);
    await sKvs.put(p, data);
    unlink(path);
  }

  Module._free(keyBuffer);
  Module.RemoveAll(`/je2be/${id}/out`);
  unmount("/wfs");

  return ok;
}

function tableName(n: number): string {
  let s = `${n}`;
  while (s.length < 6) {
    s = "0" + s;
  }
  return `${s}.ldb`;
}
