import {
  isProgressMessage,
  isStartPreMessage,
  PostDoneMessage,
  ProgressMessage,
  StartPreMessage,
  WorkerError,
} from "../../share/messages";
import { iterate, mkdirp, readFile, unlink, unmount } from "../../share/fs-ext";
import JSZip from "jszip";
import { promiseUnzipFileInZip } from "../../share/zip-ext";
import { KvsClient } from "../../share/kvs";
import { mountFilesAsWorkerFs } from "../../share/kvs-ext";
import { DlStore, FileMeta } from "../../share/dl";

self.addEventListener("message", (ev: MessageEvent) => {
  if (isStartPreMessage(ev.data)) {
    start(ev.data);
  } else if (isProgressMessage(ev.data)) {
    self.postMessage(ev.data);
  }
});

self.importScripts("./core.js");

const sKvs = new KvsClient();

type Region = {
  dim: number;
  rx: number;
  rz: number;
};

function StringToUTF8(s: string): any {
  //@ts-ignore
  return allocateUTF8(s);
}

async function start(m: StartPreMessage): Promise<void> {
  console.log(`[converter] (${m.id}) start`);
  const { id, file } = m;

  const req = indexedDB.deleteDatabase("je2be-dl");
  req.onerror = (e) => console.error(e);
  req.onsuccess = () =>
    console.log(`[converter] deleted legacy "je2be-dl" table`);

  const db = new DlStore();
  await db.dlFiles.clear();

  console.log(`[converter] (${id}) extract...`);
  await extract(file, id);
  console.log(`[converter] (${id}) extract done`);

  console.log(`[converter] (${id}) convert...`);
  await mountFilesAsWorkerFs({
    kvs: sKvs,
    prefix: `/je2be/${id}/in`,
    mountPoint: `/je2be/${id}/in`,
  });
  await mkdirp(`/je2be/${id}/out`);

  const inputPtr = StringToUTF8(`/je2be/${id}/in`);
  const outputPtr = StringToUTF8(`/je2be/${id}/out`);
  const idPtr = StringToUTF8(id);
  const ok = Module._j2b(inputPtr, outputPtr, idPtr);
  Module._free(inputPtr);
  Module._free(outputPtr);
  Module._free(idPtr);
  console.log(`[converter] (${id}) convert done`);

  unmount(`/je2be/${id}/in`);

  await collectOutputFiles(id);

  const done: PostDoneMessage = { type: "post_done", id };
  self.postMessage(done);
}

async function extract(file: File, id: string): Promise<Region[]> {
  let zip: any;
  try {
    zip = await JSZip.loadAsync(file);
  } catch (e) {
    const error: WorkerError = { type: "Unzip" };
    throw error;
  }
  const foundLevelDat: string[] = [];
  zip.forEach((p: string) => {
    if (!p.endsWith("level.dat")) {
      return;
    }
    foundLevelDat.push(p);
  });
  if (foundLevelDat.length === 0) {
    const error: WorkerError = { type: "NoLevelDatFound" };
    throw error;
  } else if (foundLevelDat.length !== 1) {
    const error: WorkerError = { type: "2OrMoreLevelDatFound" };
    throw error;
  }
  const levelDatPath = foundLevelDat[0];
  const idx = levelDatPath.lastIndexOf("level.dat");
  const prefix = levelDatPath.substring(0, idx);
  const other: string[] = [];
  const mca: string[] = [];
  const entities: string[] = [];
  zip.forEach((path: string, f: JSZip.JSZipObject) => {
    if (!path.startsWith(prefix)) {
      return;
    }
    if (f.dir) {
      return;
    }
    if (path.endsWith(".mca")) {
      if (path.includes("/region/")) {
        mca.push(path);
        return;
      } else if (path.includes("/entities/")) {
        entities.push(path);
        return;
      }
    }
    other.push(path);
  });

  const total = other.length + mca.length + entities.length;
  const m: ProgressMessage = {
    type: "progress",
    id,
    stage: "unzip",
    progress: -1,
    total,
  };
  self.postMessage(m);

  let progress = 0;
  const unzipOthers = [...other, ...entities].map(async (path) => {
    const rel = path.substring(prefix.length);
    const target = `/je2be/${id}/in/${rel}`;
    const buffer = await promiseUnzipFileInZip({ zip, path });
    await sKvs.put(target, buffer);

    progress++;
    const m: ProgressMessage = {
      type: "progress",
      id,
      stage: "unzip",
      progress,
      total,
    };
    self.postMessage(m);
  });
  await Promise.all(unzipOthers);

  const regions: Region[] = [];
  const unzipRegions = mca.map(async (path) => {
    const rel = path.substring(prefix.length);
    const target = `/je2be/${id}/in/${rel}`;
    const buffer = await promiseUnzipFileInZip({ zip, path });
    let dim = 0;
    if (rel.startsWith("region/")) {
      dim = 0;
    } else if (rel.startsWith("DIM1/region/")) {
      dim = 2;
    } else if (rel.startsWith("DIM-1/region/")) {
      dim = 1;
    } else {
      return;
    }
    const s = path.split("/").pop()!;
    const token = s.split(".");
    const rx = parseInt(token[1], 10);
    const rz = parseInt(token[2], 10);
    const region: Region = { rx, rz, dim };
    regions.push(region);
    await sKvs.put(target, buffer);
    progress++;
    const m: ProgressMessage = {
      type: "progress",
      id,
      stage: "unzip",
      progress,
      total,
    };
    self.postMessage(m);
  });
  await Promise.all(unzipRegions);
  return regions;
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
    console.log(`[converter] (${id}) ${subpath} ${data.length} bytes`);
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
