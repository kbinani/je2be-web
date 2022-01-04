import {
  isPocConvertChunkMessage,
  PocChunkConvertDoneMessage,
  PocConvertChunkMessage,
} from "../share/messages";
import { FileStorage } from "../share/file-storage";
import { WriteI32 } from "../share/heap";
import { dirname, exists, mkdirp } from "./fs-ext";

self.importScripts("./chunk-core.js");

self.onmessage = (ev: MessageEvent) => {
  if (isPocConvertChunkMessage(ev.data)) {
    startChunkConvert(ev.data);
  }
};

function startChunkConvert(m: PocConvertChunkMessage) {
  convertChunk(m);
}

async function convertChunk(m: PocConvertChunkMessage): Promise<void> {
  const { id, cx, cz, dim, javaEditionMap } = m;
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
  const rx = cx >> 5;
  const rz = cz >> 5;
  const path = `${worldDir}/region/r.${rx}.${rz}.mca`;
  if (!exists(path)) {
    const file = await fs.files.get({ path });
    if (!file) {
      return;
    }
    const dir = dirname(path);
    mkdirp(dir);
    FS.writeFile(path, file.data);
  }
  const storage = Module._malloc(javaEditionMap.length * 4);
  for (let i = 0; i < javaEditionMap.length; i++) {
    WriteI32(storage + i, javaEditionMap[i]);
  }
  Module.ConvertChunk(id, cx, cz, dim, storage, javaEditionMap.length);
  const done: PocChunkConvertDoneMessage = {
    type: "chunk_done",
    id,
    data: "foo!",
  };
  self.postMessage(done);
}
