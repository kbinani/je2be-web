import * as React from "react";
import { ChangeEvent, FC, useEffect, useMemo, useReducer, useRef } from "react";
import {
  isConvertProgressDeltaMessage,
  isExportDoneMessage,
  isPocConvertQueueingFinishedMessage,
  isPocConvertRegionDoneMessage,
  isPocConvertRegionMessage,
  isPocPostDoneMessage,
  isProgressMessage,
  ProgressMessage,
  WorkerError,
} from "../share/messages";
import { v4 as uuidv4 } from "uuid";
import { Header } from "./header";
import { Footer } from "./footer";
import { Progress } from "./progress";
import { ConvertSession } from "../conv/convert-session";

type MainComponentState = {
  unzip: number;
  convert: number;
  convertTotal: number;
  compaction: number;
  zip: number;
  copy: number;
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
  copy: 0,
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
  const { unzip, compaction, zip, copy, convert, convertTotal } = state.current;
  const disableLink =
    state.current.id !== undefined || state.current.dl !== undefined;
  const pre = useMemo(() => {
    const w = new Worker("./script/pre.js", { name: "pre" });
    w.onmessage = (ev: MessageEvent) => {
      const id = session.current?.id;
      if (isPocConvertRegionMessage(ev.data) && ev.data.id === id) {
        session.current.queue(ev.data);
      } else if (
        isPocConvertQueueingFinishedMessage(ev.data) &&
        ev.data.id === id
      ) {
        session.current.markQueueingFinished();
      } else if (isProgressMessage(ev.data) && ev.data.id === id) {
        state.current = updateProgress(state.current, ev.data);
        forceUpdate();
      } else if (isExportDoneMessage(ev.data) && ev.data.id === id) {
        session.current.setNumTotalChunks(ev.data.numTotalChunks);
        session.current.levelDirectory = ev.data.levelDirectory;
      }
    };
    return w;
  }, []);
  const post = useMemo(() => {
    const w = new Worker("./script/post.js", { name: "pre" });
    w.onmessage = (ev: MessageEvent) => {
      if (isPocPostDoneMessage(ev.data)) {
        if (session.current.id === ev.data.id) {
          session.current.markPostDone();
        }
      }
    };
    return w;
  }, []);
  const workers = useMemo(() => {
    const num = navigator.hardwareConcurrency;
    const a: Worker[] = [];
    for (let i = 0; i < num; i++) {
      const w = new Worker("./script/region.js", { name: `region#${i}` });
      w.onmessage = (ev: MessageEvent) => {
        const target = ev.target;
        if (!(target instanceof Worker)) {
          return;
        }
        const id = session.current?.id;
        if (isPocConvertRegionDoneMessage(ev.data) && ev.data.id === id) {
          session.current.done(target);
        } else if (
          isConvertProgressDeltaMessage(ev.data) &&
          ev.data.id === id
        ) {
          session.current.numDoneChunks += ev.data.delta;
          const progress = session.current.numDoneChunks;
          const total = session.current.numTotalChunks;
          const m: ProgressMessage = {
            id,
            type: "progress",
            stage: "convert",
            progress,
            total,
          };
          state.current = updateProgress(state.current, m);
          const now = Date.now();
          if (session.current.lastProgressUpdate + 1000.0 / 60.0 <= now) {
            session.current.lastProgressUpdate = now;
            forceUpdate();
          }
        }
      };
      a.push(w);
    }
    return a;
  }, []);
  const onStartPoc = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    if (!files || files.length !== 1) {
      console.error("no file selected, or one or more files selected");
      return;
    }
    const id = uuidv4();
    const file = files.item(0);
    const s = new ConvertSession(id, pre, workers, post, file);
    session.current = s;
    s.start(file);
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
          <Progress progress={copy} total={1} label={"Copy"} />
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

function updateProgress(
  state: MainComponentState,
  m: ProgressMessage
): MainComponentState {
  const p = m.progress / m.total;
  switch (m.stage) {
    case "unzip":
      return { ...state, unzip: p, convert: p >= 1 ? -1 : state.convert };
    case "convert":
      return {
        ...state,
        convert: m.progress,
        convertTotal: m.total,
        compaction: m.progress === m.total ? -1 : state.compaction,
      };
    case "compaction":
      return { ...state, compaction: p, zip: p >= 1 ? -1 : state.zip };
    case "zip":
      return { ...state, zip: p, copy: p >= 1 ? -1 : state.copy };
    case "copy":
      return { ...state, copy: p };
  }
  return { ...state };
}
