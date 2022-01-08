import {
  CompactionProgressDeltaMessage,
  CompactionQueueMessage,
  CompactionThreadFinishedMessage,
  ConvertRegionDoneMessage,
  ConvertRegionMessage,
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
  convertRegion(m).catch(console.error);
}

async function convertRegion(m: ConvertRegionMessage): Promise<void> {
  const { id, rx, rz, dim, javaEditionMap } = m;
  const kvs = new KvsClient();
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
  const regionFile = await kvs.get(region);
  if (!regionFile) {
    return;
  }
  mkdirp(dirname(region));
  writeFile(region, regionFile);

  const entities = `${worldDir}/entities/r.${rx}.${rz}.mca`;
  const entitiesFile = await kvs.get(entities);
  const entitiesFileExists: boolean = entitiesFile !== undefined;
  if (entitiesFile) {
    mkdirp(dirname(entities));
    writeFile(entities, entitiesFile);
  }

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
      const data = readFile(path);
      copy.push(kvs.put(path, data).then(() => unlink(path)));
    }
  }
  {
    const path = `${wdDir}/r.${rx}.${rz}.nbt`;
    const data = readFile(path);
    copy.push(kvs.put(path, data).then(() => unlink(path)));
  }
  await Promise.all(copy);
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
  const kvs = new KvsClient();

  let valueBufferSize = 16;
  let valueBuffer = Module._malloc(valueBufferSize);
  let keyBufferSize = 16;
  let keyBuffer = Module._malloc(keyBufferSize);
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
    let data: Uint8Array = await kvs.get(k.file);
    if (valueBufferSize < data.length) {
      Module._free(valueBuffer);
      valueBufferSize = data.length;
      valueBuffer = Module._malloc(valueBufferSize);
    }
    for (let i = 0; i < data.length; i++) {
      Module.HEAPU8[valueBuffer + i] = data[i];
    }
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
      // int AppendDbAppend(intptr_t dbPtr, intptr_t valuePtr, intptr_t keyPtr, int keySize)
      const tn = Module.AppendDbAppend(
        db,
        valueBuffer + key.pos,
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
      const data = readFile(path);
      const p = `/je2be/${id}/out/db/${index}_${i}.ldb`;
      await kvs.put(p, data);
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
    const data = readFile(path);
    const p = `/je2be/${id}/out/db/${index}_${i}.ldb`;
    await kvs.put(p, data);
    unlink(path);
  }

  {
    const path = `/je2be/${id}/out/db/MANIFEST-000001`;
    const p = `/je2be/${id}/out/db/${index}.manifest`;
    const data = readFile(path);
    await kvs.put(p, data);
    unlink(path);
  }

  Module._free(keyBuffer);
  Module._free(valueBuffer);
  Module.RemoveAll(`/je2be/${id}/out`);

  return ok;
}

function tableName(n: number): string {
  let s = `${n}`;
  while (s.length < 6) {
    s = "0" + s;
  }
  return `${s}.ldb`;
}
