import {
  Chunk,
  ConvertQueueingFinishedMessage,
  ConvertRegionMessage,
  ExportDoneMessage,
  isStartPreMessage,
  ProgressMessage,
  StartPreMessage,
  WorkerError,
} from "../../share/messages";
import { dirname, mkdirp, writeFile } from "../../share/fs-ext";
import JSZip from "jszip";
import { readI32 } from "../../share/heap";
import { promiseUnzipFileInZip } from "../../share/zip-ext";
import { KvsClient } from "../../share/kvs";
import { swapInt32 } from "../../share/number";

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
  chunks: Chunk[];
};

async function start(m: StartPreMessage): Promise<void> {
  console.log(`[pre] (${m.id}) start`);
  const { id, file } = m;

  mkdirp(`/je2be`);
  mkdirp(`/je2be/${id}/in`);
  mkdirp(`/je2be/${id}/out`);

  const req = indexedDB.deleteDatabase("je2be-dl");
  req.onerror = (e) => console.error(e);
  req.onsuccess = () => console.log(`[pre] deleted legacy "je2be-dl" table`);

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

  let progress = 0;
  const unzipToMemory = other.map(async (path) => {
    const rel = path.substring(prefix.length);
    const target = `/je2be/${id}/in/${rel}`;
    const directory = dirname(target);
    mkdirp(directory);
    const buffer = await promiseUnzipFileInZip({ zip, path });
    writeFile(target, buffer);

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

  const regions: Region[] = [];
  const unzipRegions = mca.map(async (path) => {
    const rel = path.substring(prefix.length);
    const target = `/je2be/${id}/in/${rel}`;
    const buffer = await promiseUnzipFileInZip({ zip, path });
    const dir = dirname(target);
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
    const chunks: Chunk[] = [];
    for (let x = 0; x < 32; x++) {
      for (let z = 0; z < 32; z++) {
        const chunk = await promiseExportToCompressedNbt(buffer, x, z);
        if (!chunk) {
          continue;
        }
        const cx = rx * 32 + x;
        const cz = rz * 32 + z;
        const name = `${dir}/c.${cx}.${cz}.nbt.z`;
        await sKvs.put(name, chunk);
        const c: Chunk = { cx, cz };
        chunks.push(c);
      }
    }
    const region: Region = { rx, rz, dim, chunks };
    regions.push(region);
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

  const unzipEntities = entities.map(async (path) => {
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
  await Promise.all(unzipEntities);

  const levelDirectory = dirname(levelDatPath);
  return { regions, levelDirectory };
}

function queue(id: string, regions: Region[], javaEditionMap: number[]) {
  for (const r of regions) {
    const { rx, rz, dim, chunks } = r;
    const ch: Chunk[] = [...chunks];
    const north = regions.find(
      (r) => r.dim === dim && r.rx === rx && r.rz === rz - 1
    );
    const east = regions.find(
      (r) => r.dim === dim && r.rx === rx + 1 && r.rz === rz
    );
    const south = regions.find(
      (r) => r.dim === dim && r.rx === rx && r.rz === rz + 1
    );
    const west = regions.find(
      (r) => r.dim === dim && r.rx === rx - 1 && r.rz === rz
    );
    if (north) {
      const cz = north.rz * 32 + 31;
      ch.push(...north.chunks.filter((c) => c.cz === cz));
    }
    if (east) {
      const cx = east.rx * 32;
      ch.push(...east.chunks.filter((c) => c.cx === cx));
    }
    if (south) {
      const cz = south.rz * 32;
      ch.push(...south.chunks.filter((c) => c.cz === cz));
    }
    if (west) {
      const cx = west.rz * 32 + 31;
      ch.push(...west.chunks.filter((c) => c.cx === cx));
    }
    const northEast = regions.find(
      (r) => r.dim === dim && r.rx === rx + 1 && r.rz === rz - 1
    );
    const southEast = regions.find(
      (r) => r.dim === dim && r.rx === rx + 1 && r.rz === rz + 1
    );
    const southWest = regions.find(
      (r) => r.dim === dim && r.rx === rx - 1 && r.rz === rz + 1
    );
    const northWest = regions.find(
      (r) => r.dim === dim && r.rx === rx - 1 && r.rz === rz - 1
    );
    if (northEast) {
      const cx = northEast.rx * 32;
      const cz = northEast.rz * 32 + 31;
      ch.push(...northEast.chunks.filter((c) => c.cx === cx && c.cz === cz));
    }
    if (southEast) {
      const cx = southEast.rx * 32;
      const cz = southEast.rz * 32;
      ch.push(...southEast.chunks.filter((c) => c.cx === cx && c.cz === cz));
    }
    if (southWest) {
      const cx = southWest.rx * 32 + 31;
      const cz = southWest.rz * 32;
      ch.push(...southWest.chunks.filter((c) => c.cx === cx && c.cz === cz));
    }
    if (northWest) {
      const cx = northWest.rx * 32 + 31;
      const cz = northWest.rz * 32 + 31;
      ch.push(...northWest.chunks.filter((c) => c.cx === cx && c.cz === cz));
    }
    const m: ConvertRegionMessage = {
      type: "region",
      id,
      rx,
      rz,
      dim,
      chunks: ch,
      javaEditionMap,
    };
    self.postMessage(m);
  }
}

async function promiseExportToCompressedNbt(
  mca: Uint8Array,
  localChunkX: number,
  localChunkZ: number
): Promise<Uint8Array | undefined> {
  if (localChunkX < 0 || 32 <= localChunkX) {
    return;
  }
  if (localChunkZ < 0 || 32 <= localChunkZ) {
    return;
  }

  let pos = 4 * (localChunkZ * 32 + localChunkX);
  const loc = swapInt32(readI32(pos, mca));
  if (loc === 0) {
    // The chunk is not saved yet
    return;
  }

  const kSectorSize = 4096;
  const sectorOffset = loc >> 8;
  pos = sectorOffset * kSectorSize;
  const chunkSize = swapInt32(readI32(pos, mca)) - 1;
  pos += 4;
  const compressionType = mca[pos];
  pos++;
  if (compressionType !== 2) {
    return;
  }
  if (pos + chunkSize >= mca.length) {
    return;
  }
  return mca.slice(pos, pos + chunkSize);
}
