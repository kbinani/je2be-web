import { isPocStartPreMessage, PocStartPreMessage } from "./pre";

export type PocStartPostMessage = {
  type: "post";
  id: string;
};

export function isPocStartPostMessage(x: any): x is PocStartPostMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "post" && typeof x["id"] === "string";
}

export type PocPostDoneMessage = {
  type: "post_done";
  id: string;
};

export function isPocPostDoneMessage(x: any): x is PocPostDoneMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "post_done" && typeof x["id"] === "string";
}

self.onmessage = (ev: MessageEvent) => {
  if (isPocStartPostMessage(ev.data)) {
    startPost(ev.data);
  }
};

function startPost(m: PocStartPostMessage) {
  const { id } = m;
  console.log(`[post] (${id}) start`);
  setTimeout(() => {
    const done: PocPostDoneMessage = {
      type: "post_done",
      id,
    };
    console.log(`[post] (${id}) done`);
    self.postMessage(done);
  }, 5000);
}
