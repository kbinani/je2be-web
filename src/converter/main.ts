import {
  FailedMessage,
  isStartMessage,
  StartMessage,
  SuccessMessage,
  WorkerError,
} from "../share/messages";
import * as JSZip from "jszip";
import { dirname, mkdirp } from "./fs-ext";

self.importScripts("core.js");

self.onmessage = (ev: MessageEvent) => {
  if (isStartMessage(ev.data)) {
    const id = ev.data.id;
    start(ev.data)
      .then(() => success(id))
      .catch((e) => failed(e, id))
      .finally(() => cleanup(id));
  }
};

async function start(msg: StartMessage): Promise<void> {
  console.log("converter: received StartMessage");
  const id = msg.id;
  FS.mkdir(`/${id}`);
  FS.mkdir(`/${id}/in`);
  FS.mkdir(`/${id}/out`);
  FS.mount(IDBFS, {}, `/${id}`);
  await extract(msg.file, msg.id);
  FS.syncfs((err) => {
    if (err) {
      console.error(err);
    }
  });
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
  const promises: Promise<void>[] = [];
  data.forEach((p: string, f: JSZip.JSZipObject) => {
    if (!p.startsWith(prefix)) {
      return;
    }
    if (f.dir) {
      return;
    }
    const rel = p.substring(prefix.length);
    const target = `/${id}/in/${rel}`;
    const dname = dirname(target);
    mkdirp(dname);
    const copy = new Promise<void>((resolve, reject) => {
      f.async("arraybuffer").then((buffer) => {
        try {
          const fp = FS.open(target, "w+");
          FS.write(fp, buffer, 0, buffer.byteLength, 0);
          FS.close(fp);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
    promises.push(copy);
  });
  await Promise.all(promises);
}

function success(id: string) {
  const m: SuccessMessage = { id };
  self.postMessage(m);
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

function cleanup(id: string) {}
