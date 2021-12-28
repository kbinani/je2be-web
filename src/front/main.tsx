import * as React from "react";
import { ChangeEvent, FC, useReducer, useRef } from "react";
import {
  isFailedMessage,
  isProgressMessage,
  isSuccessMessage,
  ProgressMessage,
  StartMessage,
} from "../share/messages";
import { v4 as uuidv4 } from "uuid";

type MainComponentState = {
  unzip: number;
  convert: number;
  convertTotal: number;
  compaction: number;
  zip: number;
};

export const useForceUpdate = () => {
  const [counter, setCounter] = useReducer(
    (prev: number, _: number) => prev + 1,
    0
  );
  return () => setCounter(counter + 1);
};

export const MainComponent: FC = () => {
  const state = useRef<MainComponentState>({
    unzip: 0,
    convert: 0,
    convertTotal: 0,
    compaction: 0,
    zip: 0,
  });
  const forceUpdate = useForceUpdate();
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
    state.current = {
      unzip: 0,
      convert: 0,
      convertTotal: 0,
      compaction: 0,
      zip: 0,
    };
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
        const m: ProgressMessage = msg.data;
        switch (m.stage) {
          case "unzip":
            state.current = { ...state.current, unzip: m.progress / m.total };
            break;
          case "convert":
            state.current = {
              ...state.current,
              convert: m.progress,
              convertTotal: m.total,
            };
            break;
          case "compaction":
            state.current = {
              ...state.current,
              compaction: m.progress / m.total,
            };
            break;
          case "zip":
            state.current = { ...state.current, zip: m.progress / m.total };
            break;
        }
        forceUpdate();
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
          <div className="progress">
            <div
              className="progressBar"
              style={{ width: `${state.current.unzip * 100}%` }}
            />
            <div className="progressBarLabel">{`Unzip: ${Math.floor(
              state.current.unzip * 100
            )}% done`}</div>
          </div>
          <div className="progress">
            <div
              className="progressBar"
              style={{
                width: `${
                  (state.current.convert / state.current.convertTotal) * 100
                }%`,
              }}
            />
            <div className="progressBarLabel">{`Conversion: ${Math.floor(
              state.current.convert
            )} chunks, ${Math.floor(
              (state.current.convert / state.current.convertTotal) * 100
            )}% done`}</div>
          </div>
          <div className="progress">
            <div
              className="progressBar"
              style={{ width: `${state.current.compaction * 100}%` }}
            />
            <div className="progressBarLabel">{`LevelDB Compaction: ${Math.floor(
              state.current.compaction * 100
            )}% done`}</div>
          </div>
          <div className="progress">
            <div
              className="progressBar"
              style={{ width: `${state.current.zip * 100}%` }}
            />
            <div className="progressBarLabel">{`Zip: ${Math.floor(
              state.current.zip * 100
            )}% done`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
