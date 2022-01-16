import {
  ConvertQueueingFinishedMessage,
  ConvertRegionMessage,
  ExportDoneMessage,
  isStartPreMessage,
  ProgressMessage,
  StartPreMessage,
  WorkerError,
} from "../../share/messages";
import { unmount } from "../../share/fs-ext";
import JSZip from "jszip";
import { readI32 } from "../../share/heap";
import { promiseUnzipFileInZip } from "../../share/zip-ext";
import { KvsClient } from "../../share/kvs";
import { mountFilesAsWorkerFs } from "../../share/kvs-ext";
import { DlStore } from "../../share/dl";

self.addEventListener("message", (ev: MessageEvent) => {
  if (isStartPreMessage(ev.data)) {
    const { id } = ev.data;
    start(ev.data).finally(() => {
      Module.RemoveAll(`/je2be/${id}`);
    });
  }
});

self.importScripts("./pre-wasm.js");

const sKvs = new KvsClient();

type Region = {
  dim: number;
  rx: number;
  rz: number;
};

async function start(m: StartPreMessage): Promise<void> {
  console.log(`[pre] (${m.id}) start`);
  const { id, file } = m;

  const req = indexedDB.deleteDatabase("je2be-dl");
  req.onerror = (e) => console.error(e);
  req.onsuccess = () => console.log(`[pre] deleted legacy "je2be-dl" table`);

  const db = new DlStore();
  await db.dlFiles.clear();

  console.log(`[pre] (${id}) extract...`);
  const regions = await extract(file, id);
  const numTotalChunks = regions.length * 32 * 32;
  const exportDone: ExportDoneMessage = {
    type: "export_done",
    id,
    numTotalChunks,
  };
  self.postMessage(exportDone);
  console.log(`[pre] (${id}) extract done`);

  console.log(`[pre] (${id}) pre...`);
  await mountFilesAsWorkerFs({
    kvs: sKvs,
    prefix: `/je2be/${id}/in`,
    mountPoint: `/je2be/${id}/in`,
  });
  const levelStructure = 0; //TODO: 0 = vanilla, 1 = spigot/paper
  const storage = Module._malloc(4);
  const javaEditionMapSize = Module.Pre(
    id,
    `/je2be/${id}/in`,
    `/je2be/${id}/out`,
    levelStructure,
    storage
  );
  unmount(`/je2be/${id}/in`);
  console.log(`[pre] (${id}) pre done`);

  console.log(`[pre] (${id}) queue...`);
  const javaEditionMap = [];
  const ptr = readI32(storage);
  for (let i = 0; i + 1 < javaEditionMapSize; i += 2) {
    const key = readI32(ptr + i * 4);
    const value = readI32(ptr + i * 4 + 4);
    javaEditionMap.push(key);
    javaEditionMap.push(value);
  }
  Module._free(ptr);
  Module._free(storage);
  queue(id, regions, javaEditionMap);
  console.log(`[pre] (${id}) queue done: queue length=${regions.length}`);
  const last: ConvertQueueingFinishedMessage = {
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

function queue(id: string, regions: Region[], javaEditionMap: number[]) {
  for (const r of regions) {
    const { rx, rz, dim } = r;
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
