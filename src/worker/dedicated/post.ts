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
import { File, FileStorage } from "../../share/file-storage";
import { dirname, iterate, mkdirp, writeFile } from "../../share/fs-ext";
import JSZip from "jszip";
import { promiseUnzipFileInZip } from "../../share/zip-ext";
import { ReadI32 } from "../../share/heap";
import { packU8, unpackToU8 } from "../../share/string";

self.onmessage = (ev: MessageEvent) => {
  if (isStartPostMessage(ev.data)) {
    startPost(ev.data);
  } else if (isMergeCompactionMessage(ev.data)) {
    startMerge(ev.data);
  }
};

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
  const fs = new FileStorage();
  console.log(`[post] (${id}) extract...`);
  await extract(id, file, levelDirectory);
  console.log(`[post] (${id}) extract done`);
  console.log(`[post] (${id}) loadWorldData...`);
  await loadWorldData(id, fs);
  console.log(`[post] (${id}) loadWorldData done`);
  console.log(`[post] (${id}) wasm::Post...`);
  const numFiles = Module.Post(id);
  if (numFiles < 0) {
    console.log(`[post] (${id}) wasm::Post failed: code=${numFiles}`);
    fs.close();
    return;
  }
  console.log(`[post] (${id}) wasm::Post done`);
  console.log(`[post] (${id}) retrieveMemFsFiles...`);
  await retrieveMemFsFiles(id, fs);
  console.log(`[post] (${id}) retrieveMemFsFiles done`);
  console.log(`[post] (${id}) retrieveLdbFiles...`);
  await retrieveLdbFiles(id, fs, numFiles);
  console.log(`[post] (${id}) retrieveLdbFiles done`);
  console.log(`[post] (${id}) unloadWorldData...`);
  await unloadWorldData(id, fs);
  console.log(`[post] (${id}) unloadWorldData done`);
  console.log(`[post] (${id}) collectKeys...`);
  const keys = await collectKeys(id, fs);
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

async function loadWorldData(id: string, fs: FileStorage): Promise<void> {
  const prefix = `/je2be/${id}/wd`;
  mkdirp(`${prefix}/0`);
  mkdirp(`${prefix}/1`);
  mkdirp(`${prefix}/2`);
  await fs.files
    .where("path")
    .startsWith(`${prefix}/`)
    .each((file: File) => {
      const { path, data } = file;
      writeFile(path, unpackToU8(data));
    });
}

async function unloadWorldData(id: string, fs: FileStorage): Promise<void> {
  const prefix = `/je2be/${id}/wd`;
  Module.RemoveAll(prefix);
  await fs.files.where("path").startsWith(prefix).delete();
}

async function retrieveLdbFiles(
  id: string,
  fs: FileStorage,
  numFiles: number
): Promise<void> {
  const prefix = `/je2be/${id}/ldb/`;
  for (let i = 0; i < numFiles; i++) {
    const keys = `${prefix}/level.${i}.keys`;
    const values = `${prefix}/level.${i}.values`;
    for (const path of [keys, values]) {
      const data = packU8(FS.readFile(path));
      await fs.files.put({ path, data });
      FS.unlink(path);
    }
  }
}

async function retrieveMemFsFiles(id: string, fs: FileStorage): Promise<void> {
  await iterate(`/je2be/${id}/out`, async ({ path, dir }) => {
    if (dir) {
      mkdirp(path);
    } else {
      const data = packU8(FS.readFile(path));
      await fs.files.put({ path, data });
      FS.unlink(path);
    }
  });
}

export type Key = {
  key: Uint8Array;
  file: string;
  pos: number;
};

function dbKeyFromKey(k: Key): DbKey {
  const { key, file, pos } = k;
  return { key: packU8(key), file, pos };
}

async function collectKeys(id: string, fs: FileStorage): Promise<DbKey[]> {
  const prefix = `/je2be/${id}/ldb/`;
  const keys: Key[] = [];
  await fs.files
    .where("path")
    .startsWith(prefix)
    .and((file) => file.path.endsWith(".keys"))
    .each((file: File) => {
      const { path, data: rawData } = file;
      const data = unpackToU8(rawData);
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
        const k: Key = { key, file: valuesFile, pos };
        keys.push(k);
      }
    });
  keys.sort((a: Key, b: Key) => {
    return bytewiseComparator(a.key, b.key);
  });
  return keys.map(dbKeyFromKey);
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
  const fs = new FileStorage();
  await fs.files.where("path").startsWith(`/je2be/${id}/ldb`).delete();
  const prefix = `/je2be/${id}/out/db`;
  let tableNumber = 0;
  for (let i = 0; i < numWorkers; i++) {
    for (let j = 1; ; j++) {
      const path = `${prefix}/${i}_${j}.ldb`;
      const item = await fs.files.get(path);
      if (!item) {
        break;
      }
      tableNumber++;
      const newPath = `${prefix}/${tableName(tableNumber)}`;
      await fs.files.delete(path);
      await fs.files.put({ path: newPath, data: item.data });
    }
  }
  mkdirp(prefix);
  for (let i = 0; i < numWorkers; i++) {
    const path = `${prefix}/${i}.manifest`;
    const item = await fs.files.get(path);
    if (!item) {
      fs.close();
      return false;
    }
    writeFile(path, unpackToU8(item.data));
    await fs.files.delete(path);
  }
  const ok = Module.MergeManifests(id, numWorkers, lastSequence);
  for (const name of ["MANIFEST-000001", "CURRENT"]) {
    const path = `/je2be/${id}/out/db/${name}`;
    const data = packU8(FS.readFile(path));
    await fs.files.put({ path, data });
    FS.unlink(path);
  }
  fs.close();
  return ok;
}
