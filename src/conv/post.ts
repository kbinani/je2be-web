import {
  isPocStartPostMessage,
  PocPostDoneMessage,
  PocStartPostMessage,
  WorkerError,
} from "../share/messages";
import { File, FileStorage } from "../share/file-storage";
import { dirname, mkdirp } from "./fs-ext";
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
      const fs = new FileStorage();
      fs.files
        .clear()
        .then(() => console.log(`[post] (${id}) file storage cleared`))
        .catch(console.error);
    });
}

async function post(m: PocStartPostMessage): Promise<void> {
  const { id, file, levelDirectory } = m;
  const fs = new FileStorage();
  await extract(id, file, levelDirectory);
  await loadWorldData(id, fs);
  const ok: boolean = Module.Post(id);
  if (!ok) {
    return;
  }
  const keys = await collectKeys(id, fs);
  keys.sort((a: Key, b: Key) => {
    return bytewiseComparator(a.key, b.key);
  });
  console.log(keys);
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
  return keys;
}
