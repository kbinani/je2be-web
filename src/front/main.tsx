import * as React from "react";
import { ChangeEvent, FC, useEffect, useReducer, useRef } from "react";
import {
  isFailedMessage,
  isProgressMessage,
  isSuccessMessage,
  ProgressMessage,
  StartMessage,
} from "../share/messages";
import { v4 as uuidv4 } from "uuid";
import Bugsnag from "@bugsnag/js";
import { Header } from "./header";
import { Footer } from "./footer";
import { Progress } from "./progress";

type MainComponentState = {
  unzip: number;
  convert: number;
  convertTotal: number;
  compaction: number;
  zip: number;
};

const kInitComponentState: MainComponentState = {
  unzip: 0,
  convert: 0,
  convertTotal: 1,
  compaction: 0,
  zip: 0,
};

export const useForceUpdate = () => {
  const [counter, setCounter] = useReducer(
    (prev: number, _: number) => prev + 1,
    0
  );
  return () => setCounter(counter + 1);
};

export const MainComponent: FC = () => {
  useEffect(() => {
    navigator.serviceWorker
      .register("/sworker.js", { scope: "./dl" })
      .then((sw) => {
        console.log(`[front] sworker registered`);
        sw.update()
          .then(() => {
            console.log(`[front] sworker updated`);
          })
          .catch(console.error);
      })
      .catch(console.error);
  }, []);
  const state = useRef<MainComponentState>({ ...kInitComponentState });
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
    const message: StartMessage = { type: "start", file, id };
    console.log(`[${id}] front: posting StartMessage`);
    state.current = { ...kInitComponentState };
    worker.postMessage(message);
    worker.onmessage = (msg: MessageEvent) => {
      if (isSuccessMessage(msg.data)) {
        const { id } = msg.data;
        console.log(`[${id}] front: received SuccessMessage`);
        const link = document.createElement("a");
        link.href = `/dl/${id}.zip`;
        link.click();
      } else if (isProgressMessage(msg.data)) {
        state.current = updateProgress(state.current, msg.data);
        forceUpdate();
      } else if (isFailedMessage(msg.data)) {
        Bugsnag.notify(msg.data.error);
        console.error(`front: received FailedMessage; e=`, msg.data.error);
      }
    };
  };
  const { unzip, compaction, zip } = state.current;
  const convert = Math.floor(
    (state.current.convert / state.current.convertTotal) * 100
  );
  const chunks = Math.floor(state.current.convert);
  return (
    <div className="main">
      <Header />
      <div className="container">
        <div className="inputZip">
          <label className="inputZipLabel" htmlFor={"input_zip"}>
            Choose a zip archive of Java Edition world data
          </label>
          <input
            name={"input_zip"}
            type={"file"}
            onChange={onChange}
            accept={".zip"}
          />
        </div>
        <div className="progressContainer">
          <Progress progress={unzip} label={"Unzip"} />
          <div className="progress">
            <div
              className="progressBar"
              style={{ width: `${convert}%` }}
              data-completed={convert === 100}
            />
            <div className="progressLabel">
              Conversion: {chunks} chunks, {convert}% done
            </div>
          </div>
          <Progress progress={compaction} label={"LevelDB Compaction"} />
          <Progress progress={zip} label={"Zip"} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

function updateProgress(
  state: MainComponentState,
  m: ProgressMessage
): MainComponentState {
  switch (m.stage) {
    case "unzip":
      return { ...state, unzip: m.progress / m.total };
    case "convert":
      return {
        ...state,
        convert: m.progress,
        convertTotal: m.total,
      };
    case "compaction":
      return {
        ...state,
        compaction: m.progress / m.total,
      };
    case "zip":
      return { ...state, zip: m.progress / m.total };
  }
  return { ...state };
}
