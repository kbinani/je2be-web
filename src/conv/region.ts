import {
  isPocConvertRegionMessage,
  PocConvertRegionDoneMessage,
  PocConvertRegionMessage,
} from "../share/messages";
import { FileStorage } from "../share/file-storage";
import { ReadI32, WriteI32 } from "../share/heap";
import { dirname, mkdirp } from "./fs-ext";

self.importScripts("./region-core.js");

self.onmessage = (ev: MessageEvent) => {
  if (isPocConvertRegionMessage(ev.data)) {
    startConvertRegion(ev.data);
  }
};

function startConvertRegion(m: PocConvertRegionMessage) {
  convertRegion(m);
}

async function convertRegion(m: PocConvertRegionMessage): Promise<void> {
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
  const path = `${worldDir}/region/r.${rx}.${rz}.mca`;
  const file = await fs.files.get({ path });
  if (!file) {
    return;
  }
  const dir = dirname(path);
  mkdirp(dir);
  FS.writeFile(path, file.data);
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
  FS.unlink(path);
  const numLdbFiles = ReadI32(numLdbFilesPtr);
  if (!ok) {
    return;
  }
  const copy: Promise<void>[] = [];
  for (let i = 0; i < numLdbFiles; i++) {
    const path = `${ldbDir}/r.${rx}.${rz}.${i}.ldb`;
    const data = FS.readFile(path);
    copy.push(fs.files.put({ path, data }).then(FS.unlink(path)));
  }
  {
    const path = `${wdDir}/r.${rx}.${rz}.nbt`;
    const data = FS.readFile(path);
    copy.push(fs.files.put({ path, data }).then(FS.unlink(path)));
  }
  await Promise.all(copy);
  const done: PocConvertRegionDoneMessage = {
    type: "region_done",
    id,
    data: "foo!",
  };
  self.postMessage(done);
}
