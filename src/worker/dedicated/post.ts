import {
  DbPutMessage,
  isDbPutMessage,
  isStartPostMessage,
  PostDoneMessage,
  StartPostMessage,
} from "../../share/messages";
import { iterate, readFile, unlink, unmount } from "../../share/fs-ext";
import { KvsClient } from "../../share/kvs";
import { mountFilesAsWorkerFs } from "../../share/kvs-ext";
import { DlStore, FileMeta } from "../../share/dl";

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
  const code = Module.Post(id, db);
  sDb.delete(id);
  if (code < 0) {
    console.log(`[post] (${id}) wasm::Post failed: code=${code}`);
    return;
  }
  unmountInputFiles(id);
  console.log(`[post] (${id}) wasm::Post done`);
  console.log(`[post] (${id}) collectOutputFiles...`);
  await collectOutputFiles(id);
  console.log(`[post] (${id}) collectOutputFiles done`);
  console.log(`[post] (${id}) cleanup...`);
  await cleanup(id);
  console.log(`[post] (${id}) cleanup done`);
  const done: PostDoneMessage = { type: "post_done", id };
  self.postMessage(done);
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
  unmount(`/je2be/${id}/wd`);
  unmount(`/je2be/${id}/in`);
}

async function cleanup(id: string): Promise<void> {
  const wd = `/je2be/${id}/wd`;
  await sKvs.removeKeys({ withPrefix: wd });

  const in_ = `/je2be/${id}/in`;
  await sKvs.removeKeys({ withPrefix: in_ });
}

async function collectOutputFiles(id: string): Promise<void> {
  const directory = `/je2be/${id}/out`;
  await iterate(directory, async ({ path, dir }) => {
    if (dir) {
      return;
    }
    const data = readFile(path);
    if (!data) {
      throw new Error(`Cannot read file: ${path}`);
    }
    const subpath = path.substring(`${directory}/`.length);
    console.log(`[post] (${id}) ${subpath} ${data.length} bytes`);
    await sKvs.put(path, data);
    unlink(path);
  });
  const response = await sKvs.files({ withPrefix: `${directory}/` });
  const files: FileMeta[] = response.map((f) => ({
    name: f.file.name,
    url: f.url,
  }));
  const db = new DlStore();
  await db.dlFiles.put({ id, files: files });
}
