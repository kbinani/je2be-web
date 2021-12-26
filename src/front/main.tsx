import * as React from "react";
import { ChangeEvent, FC, useState } from "react";
import {
  isFailedMessage,
  isSuccessMessage,
  StartMessage,
} from "../share/messages";

export const MainComponent: FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFiles(ev.target.files);
  };
  const onStart = () => {
    if (!files || files.length !== 1) {
      console.error("no file selected, or one or more files selected");
      return;
    }
    const worker = new Worker("out/converter.js");
    const message: StartMessage = { file: files.item(0) };
    console.log(`front: posting StartMessage`);
    worker.postMessage(message);
    worker.onmessage = (msg: MessageEvent) => {
      if (isSuccessMessage(msg.data)) {
        console.log(`front: received SuccessMessage`);
      } else if (isFailedMessage(msg.data)) {
        console.error(`front: received FailedMessage; e=`, msg.data.code);
      }
    };
  };
  return (
    <div>
      <input type="file" onChange={onChange} />
      <div className="button" onClick={onStart}>
        Start
      </div>
    </div>
  );
};
