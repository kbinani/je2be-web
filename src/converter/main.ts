import {
  FailedMessage,
  isStartMessage,
  StartMessage,
  SuccessMessage,
} from "../share/messages";
import JSZip = require("jszip");

self.onmessage = (ev: MessageEvent) => {
  if (isStartMessage(ev.data)) {
    start(ev.data);
  }
};

function start(msg: StartMessage) {
  console.log("converter: received StartMessage; file=", msg.file);
  JSZip.loadAsync(msg.file)
    .then(convert)
    .catch((e) => {
      const message: FailedMessage = { code: e };
      console.log(`converter: posting FailedMessage`);
      self.postMessage(message);
    });
}

function convert(file: JSZip) {
  file.forEach((path, file) => {
    console.log(path);
  });
  const message: SuccessMessage = {};
  console.log("converter: posting SuccessMessage");
  self.postMessage(message);
}
