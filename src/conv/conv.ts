import {
  FailedMessage,
  isStartMessage,
  ProgressMessage,
  StartMessage,
  SuccessMessage,
  WorkerError,
} from "../share/messages";
import JSZip from "jszip";
import { dirname, mkdirp, mount, umount } from "./fs-ext";
import { ChunksStore } from "../share/chunk-store";

self.importScripts("./core.js");

self.onmessage = (ev: MessageEvent) => {
  if (isStartMessage(ev.data)) {
    const id = ev.data.id;
    start(ev.data)
      .catch((e) => failed(e, id))
      .finally(() => cleanup(id));
  }
};

async function start(msg: StartMessage): Promise<void> {
  const id = msg.id;
  console.log(`[${id}] converter: received StartMessage`);
  mkdirp(`/je2be`);
  mount("je2be");
  mkdirp(`/je2be/${id}/in`);
  mkdirp(`/je2be/${id}/out`);
  mkdirp(`/je2be/dl`);
  await clearDb();

  console.log(`[${id}] extract...`);
  await extract(msg.file, msg.id);
  console.log(`[${id}] extract done`);
  console.log(`[${id}] convert...`);
  const code = await convert(id);
  console.log(`[${id}] convert done`);
  if (code < 1) {
    const e: WorkerError = {
      type: "ConverterFailed",
    };
    throw e;
  }
  console.log(`[${id}] copy...`);
  await copy(id, code);
  console.log(`[${id}] copy done`);
  send(id);
}

async function clearDb(): Promise<void> {
  const db = new ChunksStore();
  await db.chunks.clear();
  db.close();
}

async function extract(file: File, id: string) {
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
  const foundLevelDat: string[] = [];
  zip.forEach((p: string, f: JSZip.JSZipObject) => {
    if (!p.endsWith("level.dat")) {
      return;
    }
    foundLevelDat.push(p);
  });
  if (foundLevelDat.length === 0) {
    const error: WorkerError = {
      type: "NoLevelDatFound",
    };
    throw error;
  } else if (foundLevelDat.length !== 1) {
    const error: WorkerError = {
      type: "2OrMoreLevelDatFound",
    };
    throw error;
  }
  const levelDatPath = foundLevelDat[0];
  const idx = levelDatPath.lastIndexOf("level.dat");
  const prefix = levelDatPath.substring(0, idx);
  const files: string[] = [];
  zip.forEach((path: string, f: JSZip.JSZipObject) => {
    if (!path.startsWith(prefix)) {
      return;
    }
    if (f.dir) {
      return;
    }
    files.push(path);
  });
  let progress = 0;
  const total = files.length;
  const promises = files.map((path) =>
    promiseUnzipFileInZip({ id, zip, path, prefix }).then(() => {
      progress++;
      const m: ProgressMessage = {
        type: "progress",
        id,
        stage: "unzip",
        progress,
        total,
      };
      self.postMessage(m);
    })
  );
  await Promise.all(promises);
}

async function promiseUnzipFileInZip({
  id,
  zip,
  path,
  prefix,
}: {
  id: string;
  zip: JSZip;
  path: string;
  prefix: string;
}): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const rel = path.substring(prefix.length);
    const target = `/je2be/${id}/in/${rel}`;
    const directory = dirname(target);
    mkdirp(directory);
    zip
      .file(path)
      .async("uint8array")
      .then((buffer) => {
        FS.writeFile(target, buffer);
        resolve();
      })
      .catch(reject);
  });
}

async function convert(id: string): Promise<number> {
  try {
    return Module.core(
      id,
      `/je2be/${id}/in`,
      `/je2be/${id}/out`,
      `/je2be/dl/${id}`
    );
  } catch (e) {
    console.error(e);
    const m: WorkerError = {
      type: "ConverterFailed",
      native: e,
    };
    throw m;
  }
}

async function copy(id: string, count: number): Promise<void> {
  const db = new ChunksStore();
  for (let i = 0; i < count; i++) {
    const name = `/je2be/dl/${id}/${i}.bin`;
    const data: Uint8Array = FS.readFile(name);
    try {
      await db.chunks.add({
        name,
        data,
      });
      const m: ProgressMessage = {
        type: "progress",
        stage: "copy",
        id,
        progress: i + 1,
        total: count,
      };
      self.postMessage(m);
    } catch (e) {
      console.error(e);
      db.close();
      const m: WorkerError = { type: "CopyToIdb" };
      throw m;
    }
  }
  db.close();
  Module.cleanup(`/je2be/${id}`);
  Module.cleanup(`/je2be/dl/${id}`);
}

function failed(error: WorkerError, id: string) {
  const m: FailedMessage = { type: "failed", id, error };
  self.postMessage(m);
}

function send(id: string) {
  const m: SuccessMessage = { type: "success", id };
  self.postMessage(m);
}

function cleanup(id: string) {
  umount("/je2be");
}
