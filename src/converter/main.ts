import { FinishMessage, isStartMessage, StartMessage } from "../share/messages";

self.onmessage = (ev: MessageEvent) => {
  if (isStartMessage(ev.data)) {
    start(ev.data);
  }
};

function start(msg: StartMessage) {
  console.log("converter: received StartMessage; files=", msg.files);
  const finish: FinishMessage = {};
  console.log("converter: posting FinishMessage");
  self.postMessage(finish);
}
