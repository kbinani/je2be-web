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

self.onmessage = (ev: MessageEvent) => {
  if (isPocStartPostMessage(ev.data)) {
    startPost(ev.data);
  }
};

self.importScripts("./post-core.js");

function startPost(m: PocStartPostMessage) {
  const { id } = m;
  console.log(`[post] (${id}) start`);
  post(m).then(() => {
    const done: PocPostDoneMessage = {
      type: "post_done",
      id,
    };
    console.log(`[post] (${id}) done`);
    self.postMessage(done);
  });
}

async function post(m: PocStartPostMessage): Promise<void> {
  const { id, file, levelDirectory } = m;
  const fs = new FileStorage();
  await extract(id, file, levelDirectory);
  await loadWorldData(id, fs);
  Module.Post(id);
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
  let size = 0;
  await fs.files
    .where("path")
    .startsWith(`${prefix}/`)
    .each((file: File) => {
      const { path, data } = file;
      FS.writeFile(path, data);
      size += data.byteLength;
    });
  console.log(`${size} bytes copied to FS`);
}
