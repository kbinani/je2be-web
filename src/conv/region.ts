import {
  isPocConvertRegionMessage,
  PocConvertRegionDoneMessage,
  PocConvertRegionMessage,
} from "../share/messages";
import { FileStorage } from "../share/file-storage";
import { WriteI32 } from "../share/heap";
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
  Module.ConvertRegion(id, rx, rz, dim, storage, javaEditionMap.length);
  FS.unlink(path);
  const done: PocConvertRegionDoneMessage = {
    type: "region_done",
    id,
    data: "foo!",
  };
  self.postMessage(done);
}
