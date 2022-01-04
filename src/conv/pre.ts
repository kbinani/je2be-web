import {
  isPocStartPreMessage,
  PocConvertQueueingFinishedMessage,
  PocStartPreMessage,
  ProgressMessage,
  WorkerError,
} from "../share/messages";
import { dirname, mkdirp, mount } from "./fs-ext";
import JSZip from "jszip";

self.onmessage = (ev: MessageEvent) => {
  if (isPocStartPreMessage(ev.data)) {
    start(ev.data);
  }
};

self.importScripts("./pre-core.js");

async function start(m: PocStartPreMessage): Promise<void> {
  console.log(`[pre] (${m.id}) start`);
  const { id, file } = m;

  mkdirp(`/je2be`);
  mount("je2be");
  mkdirp(`/je2be/${id}/in`);
  mkdirp(`/je2be/${id}/out`);
  mkdirp(`/je2be/dl`);

  console.log(`[pre] (${id}) extract...`);
  await extract(file, id);
  console.log(`[pre] (${id}) extract done`);

  const levelStructure = 0; //TODO: 0 = vanilla, 1 = spigot/paper
  const num = Module.Pre(
    id,
    `/je2be/${id}/in`,
    `/je2be/${id}/out`,
    levelStructure
  );
  console.log(`[pre] (${id}) queueing finished: queue length=${num}`);
  const last: PocConvertQueueingFinishedMessage = {
    id,
    type: "queueing_finished",
    queueLength: num,
  };
  self.postMessage(last);
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
