import {
  ConvertQueueingFinishedMessage,
  ConvertRegionMessage,
  ExportDoneMessage,
  isStartPreMessage,
  ProgressMessage,
  StartPreMessage,
  WorkerError,
} from "../../share/messages";
import { dirname, mkdirp } from "../../share/fs-ext";
import JSZip from "jszip";
import { FileStorage } from "../../share/file-storage";
import { Point } from "../../share/cg";
import { ReadI32 } from "../../share/heap";
import { promiseUnzipFileInZip } from "../../share/zip-ext";

self.onmessage = (ev: MessageEvent) => {
  if (isStartPreMessage(ev.data)) {
    const { id } = ev.data;
    start(ev.data).finally(() => {
      Module.RemoveAll(`/je2be/${id}`);
    });
  }
};

self.importScripts("./pre-wasm.js");

type Region = {
  dim: number;
  region: Point;
};

async function start(m: StartPreMessage): Promise<void> {
  console.log(`[pre] (${m.id}) start`);
  const { id, file } = m;

  mkdirp(`/je2be`);
  mkdirp(`/je2be/${id}/in`);
  mkdirp(`/je2be/${id}/out`);

  console.log(`[pre] (${id}) extract...`);
  const { regions, levelDirectory } = await extract(file, id);
  const numTotalChunks = regions.length * 32 * 32;
  const exportDone: ExportDoneMessage = {
    type: "export_done",
    id,
    numTotalChunks,
    levelDirectory,
  };
  self.postMessage(exportDone);
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
  const last: ConvertQueueingFinishedMessage = {
    id,
    type: "queueing_finished",
  };
  self.postMessage(last);
}

async function extract(
  file: File,
  id: string
): Promise<{ regions: Region[]; levelDirectory: string }> {
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
  zip.forEach((p: string) => {
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

  const fs = new FileStorage();
  await fs.files.clear();

  let progress = 0;
  const unzipToMemory = other.map(async (path) => {
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
  await Promise.all(unzipToMemory);

  const unzipToIdb = [...mca, ...entities].map(async (path) => {
    const rel = path.substring(prefix.length);
    const target = `/je2be/${id}/in/${rel}`;
    const buffer = await promiseUnzipFileInZip({ zip, path });
    await fs.files.put({ path: target, data: buffer });
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
  await Promise.all(unzipToIdb);

  const regions = mca.map((path) => {
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
  const levelDirectory = dirname(levelDatPath);
  return { regions, levelDirectory };
}

function queue(id: string, regions: Region[], javaEditionMap: number[]) {
  for (const r of regions) {
    const { region, dim } = r;
    const { x: rx, z: rz } = region;
    const m: ConvertRegionMessage = {
      type: "region",
      id,
      rx,
      rz,
      dim,
      javaEditionMap,
    };
    self.postMessage(m);
  }
}
