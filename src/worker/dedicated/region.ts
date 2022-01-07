import {
  isConvertRegionMessage,
  ConvertRegionDoneMessage,
  ConvertRegionMessage,
} from "../../share/messages";
import { File, FileStorage } from "../../share/file-storage";
import { ReadI32, WriteI32 } from "../../share/heap";
import { dirname, mkdirp } from "../../share/fs-ext";

self.importScripts("./region-wasm.js");

self.onmessage = (ev: MessageEvent) => {
  if (isConvertRegionMessage(ev.data)) {
    startConvertRegion(ev.data);
  }
};

function startConvertRegion(m: ConvertRegionMessage) {
  convertRegion(m);
}

async function convertRegion(m: ConvertRegionMessage): Promise<void> {
  const { id, rx, rz, dim, javaEditionMap } = m;
  const fs = new FileStorage();
  const root = `/je2be/${id}/in`;
  let worldDir: string;
  switch (dim) {
    case 2:
      worldDir = `${root}/DIM1`;
      break;
    case 1:
      worldDir = `${root}/DIM-1`;
      break;
    case 0:
    default:
      worldDir = `${root}`;
      break;
  }

  const region = `${worldDir}/region/r.${rx}.${rz}.mca`;
  let regionFile: File | undefined = await fs.files.get({ path: region });
  if (!regionFile) {
    return;
  }
  mkdirp(dirname(region));
  FS.writeFile(region, regionFile.data);
  regionFile = undefined;

  const entities = `${worldDir}/entities/r.${rx}.${rz}.mca`;
  let entitiesFile: File | undefined = await fs.files.get({ path: entities });
  const entitiesFileExists = entitiesFile !== undefined;
  if (entitiesFile) {
    mkdirp(dirname(entities));
    FS.writeFile(entities, entitiesFile.data);
  }
  entitiesFile = undefined;

  const storage = Module._malloc(javaEditionMap.length * 4);
  for (let i = 0; i < javaEditionMap.length; i++) {
    WriteI32(storage + i, javaEditionMap[i]);
  }
  const ldbDir = `/je2be/${id}/ldb/${dim}`;
  mkdirp(ldbDir);
  const wdDir = `/je2be/${id}/wd/${dim}`;
  mkdirp(wdDir);
  const numLdbFilesPtr = Module._malloc(4);
  WriteI32(numLdbFilesPtr, 0);
  const ok = Module.ConvertRegion(
    id,
    rx,
    rz,
    dim,
    storage,
    javaEditionMap.length,
    numLdbFilesPtr
  );
  FS.unlink(region);
  if (entitiesFileExists) {
    FS.unlink(entities);
  }
  const numLdbFiles = ReadI32(numLdbFilesPtr);
  if (!ok) {
    return;
  }
  const copy: Promise<void>[] = [];
  for (let i = 0; i < numLdbFiles; i++) {
    for (const path of [
      `${ldbDir}/r.${rx}.${rz}.${i}.keys`,
      `${ldbDir}/r.${rx}.${rz}.${i}.values`,
    ]) {
      const data = FS.readFile(path);
      copy.push(fs.files.put({ path, data }).then(FS.unlink(path)));
    }
  }
  {
    const path = `${wdDir}/r.${rx}.${rz}.nbt`;
    const data = FS.readFile(path);
    copy.push(fs.files.put({ path, data }).then(FS.unlink(path)));
  }
  await Promise.all(copy);
  await fs.files.delete(region);
  if (entitiesFileExists) {
    await fs.files.delete(entities);
  }
  const done: ConvertRegionDoneMessage = {
    type: "region_done",
    id,
    data: "foo!",
  };
  self.postMessage(done);
}
