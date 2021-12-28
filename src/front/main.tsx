import * as React from "react";
import { ChangeEvent, FC, useState } from "react";
import {
  isFailedMessage,
  isProgressMessage,
  isSuccessMessage,
  ProgressMessage,
  StartMessage,
} from "../share/messages";
import { v4 as uuidv4 } from "uuid";

class Progress {
  readonly unzip: number;
  readonly convert: number;
  readonly compaction: number;

  constructor(msg?: ProgressMessage) {
    this.unzip = 0;
    this.convert = 0;
    this.compaction = 0;
    switch (msg?.stage) {
      case "unzip":
        this.unzip = msg.progress;
        break;
      case "convert":
        this.unzip = 1;
        this.convert = msg.progress;
        break;
      case "compaction":
        this.unzip = 1;
        this.convert = 1;
        this.compaction = msg.progress;
        break;
    }
  }
}

export const MainComponent: FC = () => {
  const [progress, setProgress] = useState<Progress>(new Progress());
  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    if (!files || files.length !== 1) {
      console.error("no file selected, or one or more files selected");
      return;
    }
    const worker = new Worker("script/conv.js");
    const id = uuidv4();
    const file = files.item(0);
    const message: StartMessage = { file, id };
    console.log(`[${id}] front: posting StartMessage`);
    worker.postMessage(message);
    worker.onmessage = (msg: MessageEvent) => {
      if (isSuccessMessage(msg.data)) {
        const { id, url } = msg.data;
        console.log(`[${id}] front: received SuccessMessage`);
        const link = document.createElement("a");
        const dot = file.name.lastIndexOf(".");
        let download = "world.mcworld";
        if (dot > 0) {
          download = file.name.substring(0, dot) + ".mcworld";
        }
        link.download = download;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      } else if (isProgressMessage(msg.data)) {
        setProgress(new Progress(msg.data));
      } else if (isFailedMessage(msg.data)) {
        console.error(`front: received FailedMessage; e=`, msg.data.error);
      }
    };
  };
  return (
    <div className="main">
      <div className="container">
        <input type="file" onChange={onChange} />
        <div className="progressContainer">
          {progress.unzip > 0 && (
            <div className="progress">
              <div
                className="progressBar"
                style={{ width: `${progress.unzip * 100}%` }}
              />
              <div className="progressBarLabel">{`Unzip: ${Math.floor(
                progress.unzip * 100
              )}% done`}</div>
            </div>
          )}
          {progress.convert > 0 && (
            <div className="progress">
              <div
                className="progressBar"
                style={{ width: `${progress.convert * 100}%` }}
              />
              <div className="progressBarLabel">{`Conversion: ${Math.floor(
                progress.convert * 100
              )}% done`}</div>
            </div>
          )}
          {progress.compaction > 0 && (
            <div className="progress">
              <div
                className="progressBar"
                style={{ width: `${progress.compaction * 100}%` }}
              />
              <div className="progressBarLabel">{`LevelDB Compaction: ${Math.floor(
                progress.compaction * 100
              )}% done`}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
