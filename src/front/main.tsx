import * as React from "react";
import { ChangeEvent, FC, useEffect, useReducer, useRef } from "react";
import { WorkerError } from "../share/messages";
import { v4 as uuidv4 } from "uuid";
import { Header } from "./header";
import { Footer } from "./footer";
import { Progress } from "./progress";
import { ConvertSession } from "../dworker/convert-session";

export type MainComponentState = {
  unzip: number;
  convert: number;
  convertTotal: number;
  compaction: number;
  zip: number;
  dl?: { id: string; filename: string };
  error?: WorkerError;
  id?: string;
};

export type MainComponentStateReducer = (
  state: MainComponentState
) => MainComponentState;

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
  const state = useRef<MainComponentState>({ ...kInitComponentState });
  const input = useRef<HTMLInputElement>(null);
  const session = useRef<ConvertSession>(null);
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
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);
  const { unzip, compaction, zip, convert, convertTotal } = state.current;
  const disableLink =
    state.current.id !== undefined || state.current.dl !== undefined;
  const onStartPoc = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    if (!files || files.length !== 1) {
      console.error("no file selected, or one or more files selected");
      return;
    }
    const id = uuidv4();
    const file = files.item(0);
    const s = new ConvertSession(id, file, (reducer, update) => {
      state.current = reducer(state.current);
      if (update) {
        forceUpdate();
      }
    });
    session.current = s;
    s.start(file);
    state.current = { ...kInitComponentState, id };
    forceUpdate();
  };
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
            onChange={onStartPoc}
            accept={".zip"}
            ref={input}
            disabled={state.current.id !== undefined}
          />
        </div>
        <div className="progressContainer">
          <Progress progress={unzip} total={1} label={"Unzip"} />
          <Progress
            progress={Math.floor(convert)}
            total={convertTotal}
            unit={"chunks"}
            label={"Conversion"}
          />
          <Progress
            progress={compaction}
            total={1}
            label={"LevelDB Compaction"}
          />
          <Progress progress={zip} total={1} label={"Zip"} />
          <div className="message">
            {state.current.dl && (
              <div className="downloadMessage">
                {`Completed: download `}
                <a
                  href={`./dl/${state.current.dl.id}?action=download&filename=${state.current.dl.filename}`}
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
