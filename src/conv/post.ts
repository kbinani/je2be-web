import {
  isPocStartPostMessage,
  PocPostDoneMessage,
  PocStartPostMessage,
  WorkerError,
} from "../share/messages";
import { File, FileStorage } from "../share/file-storage";
import { dirname, exists, mkdirp } from "./fs-ext";
import JSZip from "jszip";
import { promiseUnzipFileInZip } from "../share/zip-ext";
import { ReadI32 } from "../share/heap";

self.onmessage = (ev: MessageEvent) => {
  if (isPocStartPostMessage(ev.data)) {
    startPost(ev.data);
  }
};

self.importScripts("./post-core.js");

function startPost(m: PocStartPostMessage) {
  const { id } = m;
  console.log(`[post] (${id}) start`);
  post(m)
    .then(() => {
      const done: PocPostDoneMessage = {
        type: "post_done",
        id,
      };
      console.log(`[post] (${id}) done`);
      self.postMessage(done);
    })
    .finally(() => {
      // const fs = new FileStorage();
      // fs.files
      //   .clear()
      //   .then(() => console.log(`[post] (${id}) file storage cleared`))
      //   .catch(console.error);
    });
}

async function post(m: PocStartPostMessage): Promise<void> {
  const { id, file, levelDirectory } = m;
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
    console.log(`[post] (${id}) wasm::Post failed`);
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
  console.log(`[post] (${id}) constructDb...`);
  if (!(await constructDb(id, fs, keys))) {
    console.log(`[post] (${id}) constructDb failed`);
    return;
  }
  console.log(`[post] (${id}) constructDb done`);
  console.log(`[post] (${id}) copyLdbFiles...`);
  await copyLdbFiles(id, fs);
  console.log(`[post] (${id}) copyLdbFiles done`);
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
    FS.writeFile(target, buffer);
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
      FS.writeFile(path, data);
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
      const data = FS.readFile(path);
      await fs.files.put({ path, data });
      FS.unlink(path);
    }
  }
}

async function retrieveMemFsFiles(id: string, fs: FileStorage): Promise<void> {
  const copy = async (item: any) => {
    const { path, node } = item;
    if (node.isFolder) {
      mkdirp(path);
      for (const name of Object.keys(node.contents)) {
        const child = node.contents[name];
        const childPath = `${path}/${name}`;
        await copy({ path: childPath, node: child });
      }
    } else if (node.isDevice) {
      return;
    } else {
      const data = FS.readFile(path);
      await fs.files.put({ path, data });
    }
  };
  await copy(FS.lookupPath(`/je2be/${id}/out`));
}

type Key = {
  key: Uint8Array;
  file: string;
  pos: number;
};

async function collectKeys(id: string, fs: FileStorage): Promise<Key[]> {
  const prefix = `/je2be/${id}/ldb/`;
  const keys: Key[] = [];
  await fs.files
    .where("path")
    .startsWith(prefix)
    .and((file) => file.path.endsWith(".keys"))
    .each((file: File) => {
      const { path, data } = file;
      let ptr = 0;
      const valuesFile =
        path.substring(0, path.length - ".keys".length) + ".values";
      while (ptr < data.length) {
        const pos = ReadI32(ptr, data);
        ptr += 4;
        const keySize = ReadI32(ptr, data);
        ptr += 4;
        const key = data.slice(ptr, ptr + keySize);
        ptr += keySize;
        const k: Key = { key, file: valuesFile, pos };
        keys.push(k);
      }
    });
  keys.sort((a: Key, b: Key) => {
    return bytewiseComparator(a.key, b.key);
  });
  return keys;
}

async function constructDb(
  id: string,
  fs: FileStorage,
  keys: Key[]
): Promise<boolean> {
  const file = `/je2be/${id}/tmp.bin`;
  const db = Module.NewAppendDb(id);
  let path: string = "";
  let data: Uint8Array;
  let keyBuffer = Module._malloc(16);
  let keyBufferSize = 16;
  let ok = true;
  for (const key of keys) {
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
    //bool Append(intptr_t dbPtr, string file, intptr_t key, int keySize)
    if (!Module.Append(db, file, keyBuffer, key.key.length)) {
      console.log(`[post] wasm::Append failed`);
      ok = false;
      break;
    }
  }
  if (exists(file)) {
    FS.unlink(file);
  }
  await fs.files.where("path").startsWith(`/je2be/${id}/ldb`).delete();
  Module._free(keyBuffer);
  return ok && Module.DeleteAppendDb(db);
}

function tableName(n: number): string {
  let s = `${n}`;
  while (s.length < 6) {
    s = "0" + s;
  }
  return `${s}.ldb`;
}

async function copyLdbFiles(id: string, fs: FileStorage): Promise<void> {
  let tableNumber = 0;
  const prefix = `/je2be/${id}/out/db`;
  while (true) {
    const path = `${prefix}/${tableName(tableNumber)}`;
    tableNumber++;
    if (!exists(path)) {
      break;
    }
    const data = FS.readFile(path);
    await fs.files.put({ path, data });
    FS.unlink(path);
  }
  for (const name of ["MANIFEST-000001", "CURRENT"]) {
    const path = `/je2be/${id}/out/db/${name}`;
    const data = FS.readFile(path);
    await fs.files.put({ path, data });
    FS.unlink(path);
  }
}
