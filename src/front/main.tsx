import * as React from "react";
import { ChangeEvent, FC } from "react";
import {
  isFailedMessage,
  isSuccessMessage,
  StartMessage,
} from "../share/messages";
import { v4 as uuidv4 } from "uuid";

export const MainComponent: FC = () => {
  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    if (!files || files.length !== 1) {
      console.error("no file selected, or one or more files selected");
      return;
    }
    const worker = new Worker("script/converter.js");
    const id = uuidv4();
    const file = files.item(0);
    const message: StartMessage = { file, id };
    console.log(`[${id}] front: posting StartMessage`);
    worker.postMessage(message);
    worker.onmessage = (msg: MessageEvent) => {
      if (isSuccessMessage(msg.data)) {
        console.log(`[${id}] front: received SuccessMessage`);
        const link = document.createElement("a");
        const dot = file.name.lastIndexOf(".");
        let download = "world.mcworld";
        if (dot > 0) {
          download = file.name.substring(0, dot) + ".mcworld";
        }
        link.download = download;
        link.href = msg.data.blobUrl;
        link.click();
        URL.revokeObjectURL(msg.data.blobUrl);
      } else if (isFailedMessage(msg.data)) {
        console.error(`front: received FailedMessage; e=`, msg.data.error);
      }
    };
  };
  return (
    <div>
      <input type="file" onChange={onChange} />
    </div>
  );
};
