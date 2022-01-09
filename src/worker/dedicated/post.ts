import {
  CompactionQueueMessage,
  DbKey,
  isMergeCompactionMessage,
  isStartPostMessage,
  MergeCompactionMessage,
  PostDoneMessage,
  ProgressMessage,
  StartPostMessage,
} from "../../share/messages";
import {
  iterate,
  mkdirp,
  readFile,
  unlink,
  unmount,
  writeFile,
} from "../../share/fs-ext";
import { memcmp, readI32 } from "../../share/heap";
import { KvsClient } from "../../share/kvs";
import { mountFilesAsWorkerFs } from "../../share/kvs-ext";

self.addEventListener("message", (ev: MessageEvent) => {
  if (isStartPostMessage(ev.data)) {
    startPost(ev.data);
  } else if (isMergeCompactionMessage(ev.data)) {
    startMerge(ev.data);
  }
});

self.importScripts("./post-wasm.js");

const sKvs = new KvsClient();

function startPost(m: StartPostMessage) {
  const { id } = m;
  console.log(`[post] (${id}) start post`);
  post(m).then(() => console.log(`[post] (${id}) post done`));
}

function startMerge(m: MergeCompactionMessage) {
  const { id } = m;
  console.log(`[post] (${id}) start merge...`);
  merge(m).then(() => {
    const done: PostDoneMessage = {
      type: "post_done",
      id,
    };
    console.log(`[post] (${id}) merge done`);
    self.postMessage(done);
  });
}

async function post(m: StartPostMessage): Promise<void> {
  const { id, numWorkers } = m;
  console.log(`[post] (${id}) mountInputFiles...`);
  await mountInputFiles(id);
  console.log(`[post] (${id}) mountInputFiles done`);
  console.log(`[post] (${id}) wasm::Post...`);
  const numFiles = Module.Post(id);
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
  console.log(`[post] (${id}) collectKeys...`);
  const keys = await collectKeys(id);
  console.log(`[post] (${id}) collectKeys done`);
  console.log(`[post] (${id}) queueCompaction...`);
  queueCompaction(id, numWorkers, keys);
  console.log(`[post] (${id}) queueCompaction done`);
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

async function collectKeys(id: string): Promise<DbKey[]> {
  const prefix = `/je2be/${id}/ldb/`;
  const keys: DbKey[] = [];
  const files = (await sKvs.keys({ withPrefix: prefix })).filter((path) =>
    path.endsWith(".keys")
  );
  await Promise.all(
    files.map(async (path) => {
      const data = await sKvs.get(path);
      let ptr = 0;
      const valuesFile =
        path.substring(0, path.length - ".keys".length) + ".values";
      while (ptr < data.length) {
        const pos = readI32(ptr, data);
        ptr += 4;
        const keySize = readI32(ptr, data);
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
  const start: ProgressMessage = {
    type: "progress",
    id,
    stage: "copy",
    progress: -1,
    total: 1,
  };
  self.postMessage(start);
  const files = await sKvs.keys({ withPrefix: `/je2be/${id}/ldb` });
  await Promise.all(
    files.map(async (path) => {
      await sKvs.del(path);
    })
  );
  const prefix = `/je2be/${id}/out/db`;
  const dbFiles = (await sKvs.keys({ withPrefix: prefix })).filter((path) =>
    path.endsWith(".ldb")
  );
  const total = dbFiles.length + numWorkers + 2;
  let tableNumber = 0;
  let progress = 0;
  for (let i = 0; i < numWorkers; i++) {
    for (let j = 1; ; j++) {
      const path = `${prefix}/${i}_${j}.ldb`;
      const item = await sKvs.get(path);
      if (!item) {
        break;
      }
      tableNumber++;
      progress++;
      const newPath = `${prefix}/${tableName(tableNumber)}`;
      await sKvs.del(path);
      await sKvs.put(newPath, item);
      const mid: ProgressMessage = {
        type: "progress",
        id,
        stage: "copy",
        progress,
        total,
      };
      self.postMessage(mid);
    }
  }
  mkdirp(prefix);
  for (let i = 0; i < numWorkers; i++) {
    const path = `${prefix}/${i}.manifest`;
    const data = await sKvs.get(path);
    if (data) {
      writeFile(path, data);
      await sKvs.del(path);
    }
    progress++;
    const mid: ProgressMessage = {
      type: "progress",
      id,
      stage: "copy",
      progress,
      total,
    };
    self.postMessage(mid);
  }
  const ok = Module.MergeManifests(id, numWorkers, lastSequence);
  for (const name of ["MANIFEST-000001", "CURRENT"]) {
    const path = `/je2be/${id}/out/db/${name}`;
    const data = readFile(path);
    await sKvs.put(path, data);
    unlink(path);
    progress++;
    const mid: ProgressMessage = {
      type: "progress",
      id,
      stage: "copy",
      progress,
      total,
    };
    self.postMessage(mid);
  }
  return ok;
}
