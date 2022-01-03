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
    console.log(`[chunk#${sName}] my name is "${sName}"`);
  }
};

function startChunkConvert(m: PocConvertChunkMessage) {
  convertChunk(m);
}

async function convertChunk(m: PocConvertChunkMessage): Promise<void> {
  const { id, cx, cz, dim } = m;
  console.log(`[chunk#${sName}] (${id}) start: cx=${cx}; cz=${cz}; dim=${dim}`);
  setTimeout(() => {
    Module.ConvertChunk();
    const done: PocChunkConvertDoneMessage = {
      type: "chunk_done",
      id,
      data: "foo!",
    };
    console.log(
      `[chunk#${sName}] (${id}) done: cx=${cx}; cz=${cz}; dim=${dim}`
    );
    self.postMessage(done);
  }, 1000);
}
