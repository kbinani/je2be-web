import {
  CompactionQueueMessage,
  DbKey,
  isMergeCompactionMessage,
  isStartPostMessage,
  MergeCompactionMessage,
  PostDoneMessage,
  StartPostMessage,
  WorkerError,
} from "../../share/messages";
import {
  dirname,
  iterate,
  mkdirp,
  readFile,
  unlink,
  writeFile,
} from "../../share/fs-ext";
import JSZip from "jszip";
import { promiseUnzipFileInZip } from "../../share/zip-ext";
import { ReadI32 } from "../../share/heap";
import { KvsClient } from "../../share/kvs";
import { FileStorage } from "../../share/file-storage";

self.addEventListener("message", (ev: MessageEvent) => {
  if (isStartPostMessage(ev.data)) {
    startPost(ev.data);
  } else if (isMergeCompactionMessage(ev.data)) {
    startMerge(ev.data);
  }
});

self.importScripts("./post-wasm.js");

function startPost(m: StartPostMessage) {
  const { id } = m;
  console.log(`[post] (${id}) start`);
  post(m).finally(() => {
    // const fs = new FileStorage();
    // fs.files
    //   .clear()
    //   .then(() => console.log(`[post] (${id}) file storage cleared`))
    //   .catch(console.error);
  });
}

function startMerge(m: MergeCompactionMessage) {
  const { id } = m;
  merge(m).then(() => {
    const done: PostDoneMessage = {
      type: "post_done",
      id,
    };
    console.log(`[post] (${id}) done`);
    self.postMessage(done);
  });
}

async function post(m: StartPostMessage): Promise<void> {
  const { id, file, levelDirectory, numWorkers } = m;
  const kvs = new KvsClient();
  console.log(`[post] (${id}) extract...`);
  await extract(id, file, levelDirectory);
  console.log(`[post] (${id}) extract done`);
  console.log(`[post] (${id}) loadWorldData...`);
  await loadWorldData(id, kvs);
  console.log(`[post] (${id}) loadWorldData done`);
  console.log(`[post] (${id}) wasm::Post...`);
  const numFiles = Module.Post(id);
  if (numFiles < 0) {
    console.log(`[post] (${id}) wasm::Post failed: code=${numFiles}`);
    return;
  }
  console.log(`[post] (${id}) wasm::Post done`);
  console.log(`[post] (${id}) retrieveMemFsFiles...`);
  await retrieveMemFsFiles(id);
  console.log(`[post] (${id}) retrieveMemFsFiles done`);
  console.log(`[post] (${id}) retrieveLdbFiles...`);
  await retrieveLdbFiles(id, kvs, numFiles);
  console.log(`[post] (${id}) retrieveLdbFiles done`);
  console.log(`[post] (${id}) unloadWorldData...`);
  await unloadWorldData(id, kvs);
  console.log(`[post] (${id}) unloadWorldData done`);
  console.log(`[post] (${id}) collectKeys...`);
  const keys = await collectKeys(id, kvs);
  console.log(`[post] (${id}) collectKeys done`);
  console.log(`[post] (${id}) queueCompaction...`);
  queueCompaction(id, numWorkers, keys);
  console.log(`[post] (${id}) queueCompaction done`);
}

function memcmp(a: Uint8Array, b: Uint8Array, n: number): number {
  for (let i = 0; i < n; i++) {
    if (a[i] !== b[i]) {
      return a[i] - b[i];
    }
  }
  return 0;
}

function bytewiseComparator(a: Uint8Array, b: Uint8Array): number {
  const n = Math.min(a.length, b.length);
  const r = memcmp(a, b, n);
  if (r !== 0) {
    return r;
  }
  if (a.length < b.length) {
    return -1;
  } else if (a.length > b.length) {
    return 1;
  }
}

async function extract(
  id: string,
  file: globalThis.File,
  levelDirectory: string
): Promise<void> {
  let zip: any;
  try {
    zip = await JSZip.loadAsync(file);
  } catch (e) {
    const error: WorkerError = {
      type: "Unzip",
      native: e,
    };
    throw error;
  }
  mkdirp(`/je2be/${id}/in`);
  const files: string[] = [];
  const prefix = `${levelDirectory}/`;
  zip.forEach((p: string, f: JSZip.JSZipObject) => {
    if (f.dir) {
      return;
    }
    if (!p.startsWith(prefix)) {
      return;
    }
    if (p.endsWith(".mca")) {
      return;
    }
    files.push(p);
  });
  const promises = files.map(async (path) => {
    const buffer = await promiseUnzipFileInZip({ zip, path });
    const rel = path.substring(prefix.length);
    const target = `/je2be/${id}/in/${rel}`;
    mkdirp(dirname(target));
    writeFile(target, buffer);
  });
  await Promise.all(promises);
}

async function loadWorldData(id: string, kvs: KvsClient): Promise<void> {
  const prefix = `/je2be/${id}/wd`;
  mkdirp(`${prefix}/0`);
  mkdirp(`${prefix}/1`);
  mkdirp(`${prefix}/2`);
  const files = await kvs.keys({ withPrefix: `${prefix}/` });
  await Promise.all(
    files.map(async (path) => {
      const data = await kvs.get(path);
      writeFile(path, data);
    })
  );
}

async function unloadWorldData(id: string, kvs: KvsClient): Promise<void> {
  const prefix = `/je2be/${id}/wd`;
  Module.RemoveAll(prefix);
  const files = await kvs.keys({ withPrefix: prefix });
  await Promise.all(
    files.map(async (path) => {
      await kvs.del(path);
    })
  );
}

async function retrieveLdbFiles(
  id: string,
  kvs: KvsClient,
  numFiles: number
): Promise<void> {
  const prefix = `/je2be/${id}/ldb/`;
  for (let i = 0; i < numFiles; i++) {
    const keys = `${prefix}/level.${i}.keys`;
    const values = `${prefix}/level.${i}.values`;
    for (const path of [keys, values]) {
      const data = readFile(path);
      await kvs.put(path, data);
      unlink(path);
    }
  }
}

async function retrieveMemFsFiles(id: string): Promise<void> {
  const fs = new FileStorage();
  await iterate(`/je2be/${id}/out`, async ({ path, dir }) => {
    if (dir) {
      mkdirp(path);
    } else {
      const data = readFile(path);
      await fs.files.put({ path, data });
      unlink(path);
    }
  });
}

async function collectKeys(id: string, kvs: KvsClient): Promise<DbKey[]> {
  const prefix = `/je2be/${id}/ldb/`;
  const keys: DbKey[] = [];
  const files = (await kvs.keys({ withPrefix: prefix })).filter((path) =>
    path.endsWith(".keys")
  );
  await Promise.all(
    files.map(async (path) => {
      const data = await kvs.get(path);
      let ptr = 0;
      const valuesFile =
        path.substring(0, path.length - ".keys".length) + ".values";
      while (ptr < data.length) {
        const pos = ReadI32(ptr, data);
        ptr += 4;
        const keySize = ReadI32(ptr, data);
        ptr += 4;
        const key = new Uint8Array(keySize);
        for (let i = 0; i < keySize; i++) {
          key[i] = data[ptr + i];
        }
        ptr += keySize;
        const k: DbKey = { key, file: valuesFile, pos };
        keys.push(k);
      }
    })
  );
  keys.sort((a: DbKey, b: DbKey) => {
    return bytewiseComparator(a.key, b.key);
  });
  return keys;
}

function queueCompaction(id: string, numWorkers: number, keys: DbKey[]) {
  const size = Math.floor(keys.length / numWorkers);
  let pos = 0;
  for (let i = 0; i < numWorkers - 1; i++) {
    const queue = keys.slice(pos, pos + size);
    const m: CompactionQueueMessage = {
      type: "compaction_queue",
      index: i,
      keys: queue,
      id,
      lastSequence: keys.length,
    };
    self.postMessage(m);
    pos += size;
  }
  const q: CompactionQueueMessage = {
    type: "compaction_queue",
    index: numWorkers - 1,
    keys: keys.slice(pos),
    id,
    lastSequence: keys.length,
  };
  self.postMessage(q);
}

function tableName(n: number): string {
  let s = `${n}`;
  while (s.length < 6) {
    s = "0" + s;
  }
  return `${s}.ldb`;
}

async function merge(m: MergeCompactionMessage): Promise<boolean> {
  const { id, numWorkers, lastSequence } = m;
  const kvs = new KvsClient();
  const fs = new FileStorage();
  const files = await kvs.keys({ withPrefix: `/je2be/${id}/ldb` });
  await Promise.all(
    files.map(async (path) => {
      await kvs.del(path);
    })
  );
  const prefix = `/je2be/${id}/out/db`;
  let tableNumber = 0;
  for (let i = 0; i < numWorkers; i++) {
    for (let j = 1; ; j++) {
      const path = `${prefix}/${i}_${j}.ldb`;
      const item = await kvs.get(path);
      if (!item) {
        break;
      }
      tableNumber++;
      const newPath = `${prefix}/${tableName(tableNumber)}`;
      await kvs.del(path);
      await fs.files.put({ path: newPath, data: item });
    }
  }
  mkdirp(prefix);
  for (let i = 0; i < numWorkers; i++) {
    const path = `${prefix}/${i}.manifest`;
    const data = await kvs.get(path);
    if (!data) {
      return false;
    }
    writeFile(path, data);
    await kvs.del(path);
  }
  const ok = Module.MergeManifests(id, numWorkers, lastSequence);
  for (const name of ["MANIFEST-000001", "CURRENT"]) {
    const path = `/je2be/${id}/out/db/${name}`;
    const data = readFile(path);
    await fs.files.put({ path, data });
    unlink(path);
  }
  return ok;
}
