import {
  CompactionProgressDeltaMessage,
  CompactionQueueMessage,
  CompactionThreadFinishedMessage,
  ConvertRegionDoneMessage,
  ConvertRegionMessage,
  DbKey,
  isCompactionQueueMessage,
  isConvertRegionMessage,
} from "../../share/messages";
import { ReadI32, WriteI32 } from "../../share/heap";
import {
  dirname,
  exists,
  mkdirp,
  readFile,
  unlink,
  writeFile,
} from "../../share/fs-ext";
import { packU8, unpackToU8 } from "../../share/string";
import { Key } from "./post";
import { KvsClient } from "../../share/kvs";

self.importScripts("./region-wasm.js");

self.addEventListener("message", (ev: MessageEvent) => {
  if (isConvertRegionMessage(ev.data)) {
    startConvertRegion(ev.data);
  } else if (isCompactionQueueMessage(ev.data)) {
    startCompaction(ev.data);
  }
});

function startConvertRegion(m: ConvertRegionMessage) {
  convertRegion(m);
}

async function convertRegion(m: ConvertRegionMessage): Promise<void> {
  const { id, rx, rz, dim, javaEditionMap } = m;
  const fs = new KvsClient();
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

  const region = `${worldDir}/region/r.${rx}.${rz}.mca`;
  let regionFile = await fs.get(region);
  if (!regionFile) {
    return;
  }
  mkdirp(dirname(region));
  writeFile(region, unpackToU8(regionFile));
  regionFile = undefined;

  const entities = `${worldDir}/entities/r.${rx}.${rz}.mca`;
  let entitiesFile = await fs.get(entities);
  const entitiesFileExists = entitiesFile !== undefined;
  if (entitiesFile) {
    mkdirp(dirname(entities));
    writeFile(entities, unpackToU8(entitiesFile));
  }
  entitiesFile = undefined;

  const storage = Module._malloc(javaEditionMap.length * 4);
  for (let i = 0; i < javaEditionMap.length; i++) {
    WriteI32(storage + i, javaEditionMap[i]);
  }
  const ldbDir = `/je2be/${id}/ldb/${dim}`;
  mkdirp(ldbDir);
  const wdDir = `/je2be/${id}/wd/${dim}`;
  mkdirp(wdDir);
  const numLdbFilesPtr = Module._malloc(4);
  WriteI32(numLdbFilesPtr, 0);
  const ok = Module.ConvertRegion(
    id,
    rx,
    rz,
    dim,
    storage,
    javaEditionMap.length,
    numLdbFilesPtr
  );
  unlink(region);
  if (entitiesFileExists) {
    unlink(entities);
  }
  const numLdbFiles = ReadI32(numLdbFilesPtr);
  if (!ok) {
    return;
  }
  const copy: Promise<void>[] = [];
  for (let i = 0; i < numLdbFiles; i++) {
    for (const path of [
      `${ldbDir}/r.${rx}.${rz}.${i}.keys`,
      `${ldbDir}/r.${rx}.${rz}.${i}.values`,
    ]) {
      const data = packU8(readFile(path));
      copy.push(fs.put(path, data).then(() => unlink(path)));
    }
  }
  {
    const path = `${wdDir}/r.${rx}.${rz}.nbt`;
    const data = packU8(readFile(path));
    copy.push(fs.put(path, data).then(() => unlink(path)));
  }
  await Promise.all(copy);
  await fs.del(region);
  if (entitiesFileExists) {
    await fs.del(entities);
  }
  const done: ConvertRegionDoneMessage = {
    type: "region_done",
    id,
    data: "foo!",
  };
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

function keyFromDbKey(dbKey: DbKey): Key {
  const { key, file, pos } = dbKey;
  return { key: unpackToU8(key), file, pos };
}

async function compaction(m: CompactionQueueMessage): Promise<boolean> {
  const { id, keys: rawKeys, index } = m;
  const keys = rawKeys.map(keyFromDbKey);
  const db = Module.NewAppendDb(id);
  const fs = new KvsClient();
  const file = `/je2be/${id}/tmp.bin`;

  let keyBuffer = Module._malloc(16);
  let keyBufferSize = 16;
  let ok = true;
  let tableNumber = 0;

  let from = 0;
  while (from < keys.length) {
    const k = keys[from];
    const path = k.file;
    let to = from;
    for (let i = from + 1; i < keys.length; i++) {
      if (path === keys[i].file) {
        to = i;
      } else {
        break;
      }
    }
    const data = await fs.get(k.file);
    writeFile(file, unpackToU8(data));
    let maxTableNumber = tableNumber;
    for (let j = from; j <= to; j++) {
      const key = keys[j];
      if (keyBufferSize < key.key.byteLength) {
        Module._free(keyBuffer);
        keyBufferSize = key.key.byteLength;
        keyBuffer = Module._malloc(keyBufferSize);
      }
      for (let i = 0; i < key.key.length; i++) {
        Module.HEAPU8[keyBuffer + i] = key.key[i];
      }
      //int AppendDbAppend(intptr_t dbPtr, string file, intptr_t key, int keySize)
      const tn = Module.AppendDbAppend(
        db,
        file,
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
      const m: CompactionProgressDeltaMessage = {
        type: "compaction_progress_delta",
        id,
        delta: 1,
      };
      self.postMessage(m);
    }
    for (let i = tableNumber + 1; i <= maxTableNumber; i++) {
      const path = `/je2be/${id}/out/db/${tableName(i)}`;
      const data = packU8(readFile(path));
      const p = `/je2be/${id}/out/db/${index}_${i}.ldb`;
      await fs.put(p, data);
      unlink(path);
    }
    tableNumber = maxTableNumber;
    from = to + 1;
  }

  ok = Module.DeleteAppendDb(db) && ok;

  for (let i = tableNumber + 1; ; i++) {
    const path = `/je2be/${id}/out/db/${tableName(i)}`;
    if (!exists(path)) {
      break;
    }
    const data = packU8(readFile(path));
    const p = `/je2be/${id}/out/db/${index}_${i}.ldb`;
    await fs.put(p, data);
    unlink(path);
  }

  {
    const path = `/je2be/${id}/out/db/MANIFEST-000001`;
    const p = `/je2be/${id}/out/db/${index}.manifest`;
    const data = packU8(readFile(path));
    await fs.put(p, data);
    unlink(path);
  }

  if (exists(file)) {
    unlink(file);
  }
  Module._free(keyBuffer);

  return ok;
}

function tableName(n: number): string {
  let s = `${n}`;
  while (s.length < 6) {
    s = "0" + s;
  }
  return `${s}.ldb`;
}
