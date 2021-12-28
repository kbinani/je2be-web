import {
  FailedMessage,
  isStartMessage,
  ProgressMessage,
  StartMessage,
  SuccessMessage,
  WorkerError,
} from "../share/messages";
import JSZip from "jszip";
import { dirname, mkdirp, syncfs } from "./fs-ext";

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

  mkdirp(`/je2be`);
  FS.mount(IDBFS, {}, `/je2be`);
  await syncfs(true);
  mkdirp(`/je2be/${id}`);
  mkdirp(`/je2be/${id}/in`);
  mkdirp(`/je2be/${id}/out`);
  mkdirp(`/je2be/dl`);

  console.log(`[${id}] extract...`);
  await extract(msg.file, msg.id);
  console.log(`[${id}] extract done`);
  console.log(`[${id}] convert...`);
  const ok = await convert(msg.id);
  console.log(`[${id}] convert done`);
  if (ok) {
    send(id);
  } else {
    failed(new WorkerError("ConverterFailed"), id);
  }
}

async function extract(file: File, id: string) {
  const zip = await JSZip.loadAsync(file);
  const foundLevelDat: string[] = [];
  zip.forEach((p: string, f: JSZip.JSZipObject) => {
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

async function convert(id: string): Promise<boolean> {
  const ret = Module.core(
    id,
    `/je2be/${id}/in`,
    `/je2be/${id}/out`,
    `/je2be/dl/${id}.zip`
  );
  return ret === 0;
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

function send(id: string) {
  const file = `/je2be/dl/${id}.zip`;
  const buffer: Uint8Array = FS.readFile(file);
  FS.unlink(file);
  const blob = new Blob([buffer]);
  const url = URL.createObjectURL(blob);
  const m: SuccessMessage = { id, url };
  self.postMessage(m);
}

function cleanup(id: string) {
  Module.cleanup(`/je2be/${id}`);
  syncfs(false)
    .then(() => {
      console.log(`[${id}] syncfs done`);
    })
    .catch((e) => {
      console.error(`[${id}] syncfs failed`, e);
    });
}
