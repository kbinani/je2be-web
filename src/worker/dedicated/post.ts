import {
  DbPutMessage,
  isDbPutMessage,
  isStartPostMessage,
  StartPostMessage,
} from "../../share/messages";
import { iterate, readFile, unlink, unmount } from "../../share/fs-ext";
import { memcmp } from "../../share/heap";
import { KvsClient } from "../../share/kvs";
import { mountFilesAsWorkerFs } from "../../share/kvs-ext";

self.importScripts("./post-wasm.js");

const sDb = new Map<string, any>();

self.addEventListener("message", (ev: MessageEvent) => {
  if (isStartPostMessage(ev.data)) {
    startPost(ev.data);
  } else if (isDbPutMessage(ev.data)) {
    dbPut(ev.data);
  }
});

const sKvs = new KvsClient();

function dbPut(m: DbPutMessage) {
  const { id, key, value } = m;
  let db = sDb.get(id);
  if (db === undefined) {
    db = Module.NewDb(id);
    sDb.set(id, db);
  }
  const k = Module._malloc(key.length);
  for (let i = 0; i < key.length; i++) {
    Module.HEAPU8[k + i] = key[i];
  }
  const v = Module._malloc(value.length);
  for (let i = 0; i < value.length; i++) {
    Module.HEAPU8[v + i] = value[i];
  }
  Module.PutToDb(db, k, key.length, v, value.length);
}

function startPost(m: StartPostMessage) {
  const { id } = m;
  console.log(`[post] (${id}) start post`);
  post(m).then(() => console.log(`[post] (${id}) post done`));
}

async function post(m: StartPostMessage): Promise<void> {
  const { id } = m;
  console.log(`[post] (${id}) mountInputFiles...`);
  await mountInputFiles(id);
  console.log(`[post] (${id}) mountInputFiles done`);
  console.log(`[post] (${id}) wasm::Post...`);
  const db = sDb.get(id);
  if (db === undefined) {
    console.error(`[post] (${id}) db is not opened yet`);
    return;
  }
  const numFiles = Module.Post(id, db);
  if (numFiles < 0) {
    console.log(`[post] (${id}) wasm::Post failed: code=${numFiles}`);
    return;
  }
  unmountInputFiles(id);
  console.log(`[post] (${id}) wasm::Post done`);
  console.log(`[post] (${id}) collectOutputFiles...`);
  await collectOutputFiles(id);
  console.log(`[post] (${id}) collectOutputFiles done`);
  console.log(`[post] (${id}) removeFilesNoMoreNeeded...`);
  await removeFilesNoMoreNeeded(id);
  console.log(`[post] (${id}) removeFilesNoMoreNeeded done`);
}

async function mountInputFiles(id: string): Promise<void> {
  await mountFilesAsWorkerFs({
    kvs: sKvs,
    prefix: `/je2be/${id}/wd`,
    mountPoint: `/je2be/${id}/wd`,
  });

  await mountFilesAsWorkerFs({
    kvs: sKvs,
    prefix: `/je2be/${id}/in`,
    mountPoint: `/je2be/${id}/in`,
  });
}

function unmountInputFiles(id: string) {
  unmount(`/je2be/${id}/in`);
  unmount(`/je2be/${id}/wd`);
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

async function removeFilesNoMoreNeeded(id: string): Promise<void> {
  const wd = `/je2be/${id}/wd`;
  await sKvs.removeKeys({ withPrefix: wd });

  const in_ = `/je2be/${id}/in`;
  await sKvs.removeKeys({ withPrefix: in_ });
}

async function collectOutputFiles(id: string): Promise<void> {
  await iterate(`/je2be/${id}/ldb`, async ({ path, dir }) => {
    if (dir) {
      return;
    }
    const data = readFile(path);
    await sKvs.put(path, data);
    unlink(path);
  });

  await iterate(`/je2be/${id}/out`, async ({ path, dir }) => {
    if (dir) {
      return;
    }
    const data = readFile(path);
    await sKvs.put(path, data);
    unlink(path);
  });
}
