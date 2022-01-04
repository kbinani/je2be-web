import {
  isPocConvertChunkMessage,
  isPocYourNameMessage,
  PocChunkConvertDoneMessage,
  PocConvertChunkMessage,
} from "../share/messages";

self.importScripts("./chunk-core.js");

let sName: string;

self.onmessage = (ev: MessageEvent) => {
  if (isPocConvertChunkMessage(ev.data)) {
    startChunkConvert(ev.data);
  } else if (isPocYourNameMessage(ev.data)) {
    sName = ev.data.name;
  }
};

function startChunkConvert(m: PocConvertChunkMessage) {
  convertChunk(m);
}

async function convertChunk(m: PocConvertChunkMessage): Promise<void> {
  const { id, cx, cz, dim, javaEditionMap } = m;
  console.log(
    `[chunk#${sName}] (${id}) start: cx=${cx}; cz=${cz}; dim=${dim}; javaEditionMap.length=${javaEditionMap.length}`
  );
  const storage = Module._malloc(javaEditionMap.length * 4);
  for (let i = 0; i < javaEditionMap.length; i++) {
    Module.HEAPI32[i + storage] = javaEditionMap[i];
  }
  Module.ConvertChunk(id, cx, cz, dim, storage, javaEditionMap.length);
  const done: PocChunkConvertDoneMessage = {
    type: "chunk_done",
    id,
    data: "foo!",
  };
  console.log(`[chunk#${sName}] (${id}) done: cx=${cx}; cz=${cz}; dim=${dim}`);
  self.postMessage(done);
}
