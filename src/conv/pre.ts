import {
  isPocStartPreMessage,
  PocConvertChunkMessage,
  PocConvertQueueingFinishedMessage,
  PocStartPreMessage,
} from "../share/messages";

self.onmessage = (ev: MessageEvent) => {
  if (isPocStartPreMessage(ev.data)) {
    start(ev.data);
  }
};

self.importScripts("./pre-core.js");

async function start(m: PocStartPreMessage): Promise<void> {
  console.log(`[pre] (${m.id}) start`);
  const { id } = m;
  Module.Pre();
  const minChunkX = -16;
  const maxChunkX = 16;
  const minChunkZ = -20;
  const maxChunkZ = 30;
  let num = 0;
  for (const dim of [1, 2, 3]) {
    for (let cx = minChunkX; cx <= maxChunkX; cx++) {
      for (let cz = minChunkZ; cz <= maxChunkZ; cz++) {
        const message: PocConvertChunkMessage = {
          id,
          type: "chunk",
          cx,
          cz,
          dim,
        };
        console.log(`[pre] (${id}) queue dim=${dim}; cx=${cx}; cz=${cz}`);
        num++;
        self.postMessage(message);
      }
    }
  }
  console.log(`[pre] (${id}) queueing finished: queue length=${num}`);
  const last: PocConvertQueueingFinishedMessage = {
    id,
    type: "queueing_finished",
  };
  self.postMessage(last);
}
