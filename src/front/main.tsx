import * as React from "react";
import {
  ChangeEvent,
  FC,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { WorkerError } from "../share/messages";
import { v4 as uuidv4 } from "uuid";
import { Header } from "./header";
import { Footer } from "./footer";
import { Progress } from "./progress";
import { ConvertSession } from "./convert-session";
import { ServiceWorkerLauncher } from "./service-worker-launcher";
import { Context } from "./state";

export type MainComponentState = {
  unzip: number;
  convert: number;
  convertTotal: number;
  compaction: number;
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
  const session = useRef<ConvertSession | null>(null);
  const forceUpdate = useForceUpdate();
  const onBeforeUnload = (ev: BeforeUnloadEvent) => {
    if (state.current.id === undefined) {
      return;
    }
    ev.preventDefault();
    ev.returnValue = "Converter still working. Do you really leave the page?";
  };
  const onUnload = () => {
    session.current?.close();
  };
  useEffect(() => {
    const launcher = new ServiceWorkerLauncher();
    launcher
      .launch()
      .then(() => console.log(`[front] sw launched`))
      .catch(console.error);
    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("unload", onUnload);
    //TODO: assert window.crossOriginIsolated === true
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);
  useEffect(() => {
    if (state.current.id === undefined && input.current) {
      input.current.value = "";
    }
  }, [state.current.id]);
  const { unzip, compaction, convert, convertTotal } = state.current;
  const disableLink =
    state.current.id !== undefined || state.current.dl !== undefined;
  const onStart = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    if (!files || files.length !== 1) {
      console.error("no file selected, or one or more files selected");
      return;
    }
    const id = uuidv4();
    const file = files.item(0)!;
    const s = new ConvertSession(id, file, (reducer, update) => {
      state.current = reducer(state.current);
      if (update) {
        forceUpdate();
      }
    });
    session.current?.close();
    session.current = s;
    s.start(file);
    state.current = { ...kInitComponentState, id };
    forceUpdate();
  };
  return (
    <>
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
              onChange={onStart}
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
    </>
  );
};

export const Main: React.FC = () => {
  const state = useContext(Context);
  return (
    <div className="main">
      <Header disableLink={state.progress !== undefined} />
      <div className="container"></div>
      <Footer />
    </div>
  );
};
