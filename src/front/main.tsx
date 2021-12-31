import * as React from "react";
import { ChangeEvent, FC, useEffect, useMemo, useReducer, useRef } from "react";
import {
  isFailedMessage,
  isProgressMessage,
  isSuccessMessage,
  ProgressMessage,
  StartMessage,
  WorkerError,
} from "../share/messages";
import { v4 as uuidv4 } from "uuid";
import { Header } from "./header";
import { Footer } from "./footer";
import { Progress } from "./progress";

type MainComponentState = {
  unzip: number;
  convert: number;
  convertTotal: number;
  compaction: number;
  zip: number;
  dl?: { id: string; filename: string };
  error?: WorkerError;
  id?: string;
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
  const worker = useMemo(() => new Worker("./script/conv.js"), []);
  const state = useRef<MainComponentState>({ ...kInitComponentState });
  const input = useRef<HTMLInputElement>(null);
  const forceUpdate = useForceUpdate();
  const onBeforeUnload = (ev: BeforeUnloadEvent) => {
    if (state.current.id === undefined) {
      return;
    }
    ev.preventDefault();
    ev.returnValue = "Converter still working. Do you really leave the page?";
  };
  useEffect(() => {
    const { protocol, host, href } = window.location;
    const prefix = `${protocol}//${host}/`;
    const path = href.substring(prefix.length);
    const scope = `/${path}dl`;
    console.log(`scope=${scope}`);
    navigator.serviceWorker
      .register("./sworker.js", { scope })
      .then((sw) => {
        console.log(`[front] sworker registered`);
        sw.update()
          .then(() => {
            console.log(`[front] sworker updated`);
          })
          .catch(console.error);
      })
      .catch(console.error);
    window.addEventListener("beforeunload", onBeforeUnload);
  }, []);
  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    if (!files || files.length !== 1) {
      console.error("no file selected, or one or more files selected");
      return;
    }
    const id = uuidv4();
    const file = files.item(0);
    const message: StartMessage = { type: "start", file, id };
    console.log(`[${id}] front: posting StartMessage`);
    state.current = { ...kInitComponentState, id };
    forceUpdate();
    worker.postMessage(message);
    worker.onmessage = (msg: MessageEvent) => {
      if (msg.data["id"] !== state.current.id) {
        return;
      }
      if (isSuccessMessage(msg.data)) {
        const { id } = msg.data;
        const dot = file.name.lastIndexOf(".");
        let filename = "world.mcworld";
        if (dot > 0) {
          filename = file.name.substring(0, dot) + ".mcworld";
        }
        state.current = {
          ...state.current,
          dl: { id, filename },
          error: undefined,
          id: undefined,
        };
        input.current.value = "";
        forceUpdate();
      } else if (isProgressMessage(msg.data)) {
        state.current = updateProgress(state.current, msg.data);
        forceUpdate();
      } else if (isFailedMessage(msg.data)) {
        state.current = {
          ...state.current,
          error: msg.data.error,
          id: undefined,
        };
        input.current.value = "";
        forceUpdate();
      }
    };
  };
  const { unzip, compaction, zip } = state.current;
  const convert = Math.floor(
    (state.current.convert / state.current.convertTotal) * 100
  );
  const chunks = Math.floor(state.current.convert);
  const disableLink =
    state.current.id !== undefined || state.current.dl !== undefined;
  return (
    <div className="main">
      <Header disableLink={disableLink} />
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
            ref={input}
            disabled={state.current.id !== undefined}
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
          <div className="message">
            {state.current.dl && (
              <div className="downloadMessage">
                {`Completed: download `}
                <a
                  href={`./dl/${state.current.dl.id}.zip?download=${state.current.dl.filename}`}
                >
                  {state.current.dl.filename}
                </a>
              </div>
            )}
            {state.current.error && (
              <div className="errorMessage">
                Failed: ErrorType={state.current.error.type}
              </div>
            )}
          </div>
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
