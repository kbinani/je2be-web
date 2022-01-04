import {
  ExportDoneMessage,
  isPocStartPreMessage,
  PocConvertChunkMessage,
  PocConvertQueueingFinishedMessage,
  PocStartPreMessage,
  ProgressMessage,
  WorkerError,
} from "../share/messages";
import { dirname, mkdirp, mount, syncfs } from "./fs-ext";
import JSZip from "jszip";
import { FileStorage } from "../share/file-storage";
import { Point } from "../share/cg";
import { ReadI32 } from "../share/heap";

self.onmessage = (ev: MessageEvent) => {
  if (isPocStartPreMessage(ev.data)) {
    start(ev.data);
  }
};

self.importScripts("./pre-core.js");

type Region = {
  dim: number;
  region: Point;
};

async function start(m: PocStartPreMessage): Promise<void> {
  console.log(`[pre] (${m.id}) start`);
  const { id, file } = m;

  mkdirp(`/je2be`);
  mount("je2be");
  mkdirp(`/je2be/${id}/in`);
  mkdirp(`/je2be/${id}/out`);
  mkdirp(`/je2be/dl`);

  console.log(`[pre] (${id}) extract...`);
  const regions = await extract(file, id);
  const numTotalChunks = regions.length * 32 * 32;
  const exportDone: ExportDoneMessage = {
    type: "export_done",
    id,
    numTotalChunks,
  };
  self.postMessage(exportDone);
  await syncfs(false);
  console.log(`[pre] (${id}) extract done`);

  console.log(`[pre] (${id}) pre...`);
  const levelStructure = 0; //TODO: 0 = vanilla, 1 = spigot/paper
  const storage = Module._malloc(4);
  const javaEditionMapSize = Module.Pre(
    id,
    `/je2be/${id}/in`,
    `/je2be/${id}/out`,
    levelStructure,
    storage
  );
  await syncfs(false);
  console.log(`[pre] (${id}) pre done`);

  console.log(`[pre] (${id}) queue...`);
  const javaEditionMap = [];
  const ptr = ReadI32(storage);
  for (let i = 0; i + 1 < javaEditionMapSize; i += 2) {
    const key = ReadI32(ptr + i * 4);
    const value = ReadI32(ptr + i * 4 + 4);
    javaEditionMap.push(key);
    javaEditionMap.push(value);
  }
  Module._free(ptr);
  Module._free(storage);
  queue(id, regions, javaEditionMap);
  console.log(`[pre] (${id}) queue done: queue length=${numTotalChunks}`);
  const last: PocConvertQueueingFinishedMessage = {
    id,
    type: "queueing_finished",
  };
  self.postMessage(last);
}

async function extract(file: File, id: string): Promise<Region[]> {
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
  const regions: string[] = [];
  zip.forEach((path: string, f: JSZip.JSZipObject) => {
    if (!path.startsWith(prefix)) {
      return;
    }
    if (f.dir) {
      return;
    }
    if (
      path.endsWith(".mca") &&
      path.includes("/region/") &&
      !path.includes("/entities/")
    ) {
      regions.push(path);
    } else {
      files.push(path);
    }
  });
  let progress = 0;
  const total = files.length;
  const unzip = files.map(async (path) => {
    const rel = path.substring(prefix.length);
    const target = `/je2be/${id}/in/${rel}`;
    const directory = dirname(target);
    mkdirp(directory);
    const buffer = await promiseUnzipFileInZip({ zip, path });
    FS.writeFile(target, buffer);

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
  await Promise.all(unzip);

  const fs = new FileStorage();
  const copy = regions.map(async (path) => {
    const rel = path.substring(prefix.length);
    const target = `/je2be/${id}/in/${rel}`;
    const buffer = await promiseUnzipFileInZip({ zip, path });
    await fs.files.put({ path: target, data: buffer });
  });
  await Promise.all(copy);

  return regions.map((path) => {
    let dim = 0;
    if (path.includes("/DIM1/")) {
      dim = 2;
    } else if (path.includes("/DIM-1/")) {
      dim = 1;
    }
    const s = path.split("/").pop();
    const token = s.split(".");
    const rx = parseInt(token[1], 10);
    const rz = parseInt(token[2], 10);
    return { dim, region: new Point(rx, rz) };
  });
}

async function promiseUnzipFileInZip({
  zip,
  path,
}: {
  zip: JSZip;
  path: string;
}): Promise<Uint8Array> {
  return new Promise<Uint8Array>((resolve, reject) => {
    zip
      .file(path)
      .async("uint8array")
      .then((buffer) => {
        resolve(buffer);
      })
      .catch(reject);
  });
}

function queue(id: string, regions: Region[], javaEditionMap: number[]) {
  for (const r of regions) {
    const { region, dim } = r;
    for (let x = 0; x < 32; x++) {
      for (let z = 0; z < 32; z++) {
        const cx = region.x * 32 + x;
        const cz = region.z * 32 + z;
        const m: PocConvertChunkMessage = {
          type: "chunk",
          id,
          cx,
          cz,
          dim,
          javaEditionMap,
        };
        self.postMessage(m);
      }
    }
  }
}
