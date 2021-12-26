import * as React from "react";
import { ChangeEvent, FC, useState } from "react";
import { isFinishMessage, StartMessage } from "../share/messages";

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
    const message: StartMessage = { files };
    console.log(`front: posting StartMessage`);
    worker.postMessage(message);
    worker.onmessage = (msg: MessageEvent) => {
      if (isFinishMessage(msg.data)) {
        console.log(`front: received FinishMessage`);
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
