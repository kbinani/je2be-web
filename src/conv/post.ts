import {
  isPocStartPostMessage,
  PocPostDoneMessage,
  PocStartPostMessage,
} from "../share/messages";

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
