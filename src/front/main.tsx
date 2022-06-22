import * as React from "react";
import { ChangeEvent, FC, useEffect, useReducer, useRef } from "react";
import { WorkerError } from "../share/messages";
import { v4 as uuidv4 } from "uuid";
import { Header } from "./header";
import { Footer } from "./footer";
import { Progress } from "./progress";
import { ConvertSession } from "./convert-session";
import { ServiceWorkerLauncher } from "./service-worker-launcher";

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
  const je2be = useRef<HTMLDivElement>(null);
  const be2je = useRef<HTMLDivElement>(null);
  const mode = useRef<"je2be" | "be2je">("je2be");
  const onClickHeader = () => {
    if (mode.current === "je2be") {
      setMode("be2je");
    } else {
      setMode("je2be");
    }
  };
  const setMode = (next: "je2be" | "be2je") => {
    if (next === mode.current) {
      return;
    }
    const j2b = je2be.current;
    const b2j = be2je.current;
    switch (next) {
      case "je2be": {
        j2b?.classList.remove("transitionHide");
        j2b?.classList.add("transitionAppear");

        b2j?.classList.remove("transitionAppear");
        b2j?.classList.add("transitionHide");
        break;
      }
      case "be2je": {
        j2b?.classList.remove("transitionAppear");
        j2b?.classList.add("transitionHide");

        b2j?.classList.remove("transitionHide");
        b2j?.classList.add("transitionAppear");
        break;
      }
    }
    mode.current = next;
  };
  return (
    <>
      <div className="je2be" ref={je2be}>
        <Header disableLink={disableLink} onClick={onClickHeader} />
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
      <div className="be2je" ref={be2je}>
        <Header disableLink={disableLink} onClick={onClickHeader} />
        <div
          style={{
            width: "100%",
            height: "100%",
            fontSize: 30,
            fontWeight: 900,
            marginTop: 90,
            color: "var(--background-dark)",
            textAlign: "center",
          }}
        >
          Bedrock to Java conversion functionality is in-dev!
        </div>
        <Footer />
      </div>
    </>
  );
};
