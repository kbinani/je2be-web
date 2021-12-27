import {
  FailedMessage,
  isStartMessage,
  StartMessage,
  SuccessMessage,
  WorkerError,
} from "../share/messages";
import JSZip from "jszip";
import { dirname, mkdirp } from "./fs-ext";

self.importScripts("core.js");

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

  FS.mkdir(`/${id}`);
  FS.mkdir(`/${id}/in`);
  FS.mkdir(`/${id}/out`);
  FS.mount(IDBFS, {}, `/${id}`);

  console.log(`[${id}] extract...`);
  await extract(msg.file, msg.id);
  console.log(`[${id}] extract done`);
  console.log(`[${id}] convert...`);
  const files = await convert(msg.id);
  console.log(`[${id}] convert done`);
  console.log(`[${id}] archive...`);
  const url = await archive(id, files);
  console.log(`[${id}] archive done`);
  success(id, url);
}

async function extract(file: File, id: string) {
  const data = await JSZip.loadAsync(file);
  const foundLevelDat: string[] = [];
  data.forEach((p: string, f: JSZip.JSZipObject) => {
    if (!p.endsWith("level.dat")) {
      return;
    }
    foundLevelDat.push(p);
  });
  if (foundLevelDat.length !== 1) {
    throw new WorkerError("NoLevelDatFound");
  }
  const levelDatPath = foundLevelDat[0];
  const idx = levelDatPath.lastIndexOf("level.dat");
  const prefix = levelDatPath.substring(0, idx);
  const files: string[] = [];
  data.forEach((p: string, f: JSZip.JSZipObject) => {
    if (!p.startsWith(prefix)) {
      return;
    }
    if (f.dir) {
      return;
    }
    files.push(p);
  });
  const promises: Promise<void>[] = [];
  for (const p of files) {
    promises.push(
      new Promise((resolve, reject) => {
        const rel = p.substring(prefix.length);
        const target = `/${id}/in/${rel}`;
        const dname = dirname(target);
        mkdirp(dname);
        data
          .file(p)
          .async("uint8array")
          .then((buffer) => {
            FS.writeFile(target, buffer);
            resolve();
          })
          .catch(reject);
      })
    );
  }
  await Promise.all(promises);
}

async function convert(id: string): Promise<string[]> {
  const ret = Module.core(`/${id}/in`, `/${id}/out`);
  return ret.split("\x0d").filter((it) => it !== "");
}

async function archive(id: string, files: string[]): Promise<string> {
  const prefix = `/${id}/out/`;
  const zip = new JSZip();
  for (const file of files) {
    if (!file.startsWith(prefix)) {
      continue;
    }
    const buffer = FS.readFile(file);
    const rel = file.substring(prefix.length);
    zip.file(rel, buffer);
  }
  const archived: Uint8Array = await zip.generateAsync({ type: "uint8array" });
  const blob = new Blob([archived]);
  return URL.createObjectURL(blob);
}

function failed(e: Error, id: string) {
  let error: WorkerError;
  if (e instanceof WorkerError) {
    error = e;
  } else {
    error = new WorkerError("Other", e);
  }
  const m: FailedMessage = { id, error };
  self.postMessage(m);
  console.error(e);
}

function success(id: string, url: string) {
  const m: SuccessMessage = { id, blobUrl: url };
  self.postMessage(m);
}

function cleanup(id: string) {
  const keepFs = false;
  if (keepFs) {
    FS.syncfs(false, (err) => {
      if (err) {
        console.error(`[${id}] syncfs failed`, err);
      } else {
        console.log(`[${id}] syncfs done`);
      }
    });
  } else {
    Module.cleanup(`/${id}`);
  }
}
