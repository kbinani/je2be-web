import { isPocConvertChunkMessage, PocConvertChunkMessage } from "./pre";

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

export type PocYourNameMessage = {
  type: "your_name";
  name: string;
};

export function isPocYourNameMessage(x: any): x is PocYourNameMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "your_name" && typeof x["name"] === "string";
}

export type PocChunkConvertDoneMessage = {
  type: "chunk_done";
  id: string;
  data: string;
};

export function isPocChunkConvertDoneMessage(
  x: any
): x is PocChunkConvertDoneMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "chunk_done" &&
    typeof x["id"] === "string" &&
    typeof x["data"] === "string"
  );
}

function startChunkConvert(m: PocConvertChunkMessage) {
  convertChunk(m);
}

async function convertChunk(m: PocConvertChunkMessage): Promise<void> {
  const { id, cx, cz, dim } = m;
  console.log(`[chunk#${sName}] (${id}) start: cx=${cx}; cz=${cz}; dim=${dim}`);
  setTimeout(() => {
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
