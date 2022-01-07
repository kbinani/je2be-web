import {
  CompactionQueueMessage,
  CompactionThreadFinishedMessage,
  ConvertRegionDoneMessage,
  ConvertRegionMessage,
  isCompactionQueueMessage,
  isConvertRegionMessage,
} from "../../share/messages";
import { File, FileStorage } from "../../share/file-storage";
import { ReadI32, WriteI32 } from "../../share/heap";
import { dirname, exists, mkdirp } from "../../share/fs-ext";

self.importScripts("./region-wasm.js");

self.onmessage = (ev: MessageEvent) => {
  if (isConvertRegionMessage(ev.data)) {
    startConvertRegion(ev.data);
  } else if (isCompactionQueueMessage(ev.data)) {
    startCompaction(ev.data);
  }
};

function startConvertRegion(m: ConvertRegionMessage) {
  convertRegion(m);
}

async function convertRegion(m: ConvertRegionMessage): Promise<void> {
  const { id, rx, rz, dim, javaEditionMap } = m;
  const fs = new FileStorage();
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
  let regionFile: File | undefined = await fs.files.get({ path: region });
  if (!regionFile) {
    return;
  }
  mkdirp(dirname(region));
  FS.writeFile(region, regionFile.data);
  regionFile = undefined;

  const entities = `${worldDir}/entities/r.${rx}.${rz}.mca`;
  let entitiesFile: File | undefined = await fs.files.get({ path: entities });
  const entitiesFileExists = entitiesFile !== undefined;
  if (entitiesFile) {
    mkdirp(dirname(entities));
    FS.writeFile(entities, entitiesFile.data);
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
  FS.unlink(region);
  if (entitiesFileExists) {
    FS.unlink(entities);
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
      const data = FS.readFile(path);
      copy.push(fs.files.put({ path, data }).then(FS.unlink(path)));
    }
  }
  {
    const path = `${wdDir}/r.${rx}.${rz}.nbt`;
    const data = FS.readFile(path);
    copy.push(fs.files.put({ path, data }).then(FS.unlink(path)));
  }
  await Promise.all(copy);
  await fs.files.delete(region);
  if (entitiesFileExists) {
    await fs.files.delete(entities);
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

async function compaction(m: CompactionQueueMessage): Promise<boolean> {
  const { id, keys, index } = m;
  const db = Module.NewAppendDb(id);
  const fs = new FileStorage();
  const file = `/je2be/${id}/tmp.bin`;

  let path: string = "";
  let data: Uint8Array;
  let keyBuffer = Module._malloc(16);
  let keyBufferSize = 16;
  let ok = true;
  let tableNumber = 0;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (path !== key.file) {
      const f = await fs.files.get(key.file);
      data = f.data;
      path = key.file;
    }
    const size = ReadI32(key.pos, data);
    FS.writeFile(file, data.slice(key.pos + 4, key.pos + 4 + size));
    if (keyBufferSize < key.key.byteLength) {
      Module._free(keyBuffer);
      keyBufferSize = key.key.byteLength;
      keyBuffer = Module._malloc(keyBufferSize);
    }
    for (let i = 0; i < key.key.length; i++) {
      Module.HEAPU8[keyBuffer + i] = key.key[i];
    }
    //int AppendDbAppend(intptr_t dbPtr, string file, intptr_t key, int keySize)
    const maxTableNumber = Module.AppendDbAppend(
      db,
      file,
      keyBuffer,
      key.key.length
    );
    if (maxTableNumber < 0) {
      console.log(`[post] wasm::Append failed`);
      ok = false;
      break;
    }
    for (let i = tableNumber + 1; i <= maxTableNumber; i++) {
      const path = `/je2be/${id}/out/db/${tableName(i)}`;
      const data = FS.readFile(path);
      const p = `/je2be/${id}/out/db/${index}_${i}.ldb`;
      await fs.files.put({ path: p, data });
      FS.unlink(path);
    }
    tableNumber = maxTableNumber;
  }

  ok = Module.DeleteAppendDb(db) && ok;

  for (let i = tableNumber + 1; ; i++) {
    const path = `/je2be/${id}/out/db/${tableName(i)}`;
    if (!exists(path)) {
      break;
    }
    const data = FS.readFile(path);
    const p = `/je2be/${id}/out/db/${index}_${i}.ldb`;
    await fs.files.put({ path: p, data });
    FS.unlink(path);
  }

  {
    const path = `/je2be/${id}/out/db/MANIFEST-000001`;
    const p = `/je2be/${id}/out/db/${index}.manifest`;
    const data = FS.readFile(path);
    await fs.files.put({ path: p, data });
    FS.unlink(path);
  }

  if (exists(file)) {
    FS.unlink(file);
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
