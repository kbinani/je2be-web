export type PocStartPreMessage = {
  type: "pre";
  id: string;
};

export function isPocStartPreMessage(x: any): x is PocStartPreMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "pre" && typeof x["id"] === "string";
}

self.onmessage = (ev: MessageEvent) => {
  if (isPocStartPreMessage(ev.data)) {
    start(ev.data);
  }
};

export type PocConvertChunkMessage = {
  type: "chunk";
  id: string;
  cx: number;
  cz: number;
  dim: number;
};

export function isPocConvertChunkMessage(x: any): x is PocConvertChunkMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "chunk" &&
    typeof x["id"] === "string" &&
    typeof x["cx"] === "number" &&
    typeof x["cz"] === "number" &&
    typeof x["dim"] === "number"
  );
}

export type PocConvertQueueingFinishedMessage = {
  id: string;
  type: "queueing_finished";
};

export function isPocConvertQueueingFinishedMessage(
  x: any
): x is PocConvertQueueingFinishedMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "queueing_finished" && typeof x["id"] === "string";
}

async function start(m: PocStartPreMessage): Promise<void> {
  console.log(`[pre] (${m.id}) start`);
  const { id } = m;
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
