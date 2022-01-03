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
import { ChunksStore } from "../share/chunk-store";
import {
  isPocConvertChunkMessage,
  isPocConvertQueueingFinishedMessage,
  PocConvertChunkMessage,
  PocStartMessage,
} from "../conv/pre";
import {
  isPocChunkConvertDoneMessage,
  PocYourNameMessage,
} from "../conv/chunk";

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

class ConvertSession {
  private count = 0;
  private finalCount = 0;
  private done = 0;

  constructor(
    readonly id: string,
    readonly pre: Worker,
    readonly workers: Worker[],
    readonly post: Worker
  ) {}

  start() {
    console.log(`[front] (${this.id}) start`);
    const start: PocStartMessage = { type: "start", id: this.id };
    this.pre.postMessage(start);
  }

  roundRobin(m: PocConvertChunkMessage) {
    const index = this.count % this.workers.length;
    this.workers[index].postMessage(m);
    this.count++;
  }

  markQueueingFinished() {
    console.log(`[front] (${this.id}) all queueing finished`);
    this.finalCount = this.count;
  }

  incrementDone() {
    this.done++;
    if (this.finalCount === this.done) {
      //TODO:
      console.log(`[front] (${this.id}) all chunk conversion finished`);
    }
  }
}

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
      const id = state.current.id;
      if (id) {
        cleanup(id);
      }
    };
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
    console.log(`[front] (${id}) posting StartMessage`);
    state.current = { ...kInitComponentState, id, unzip: -1 };
    forceUpdate();
    worker.postMessage(message);
    let lastUpdate = Date.now();
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
        const now = Date.now();
        if (lastUpdate + 1000.0 / 60.0 <= now) {
          lastUpdate = now;
          forceUpdate();
        }
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
  const { unzip, compaction, zip, copy, convert, convertTotal } = state.current;
  const disableLink =
    state.current.id !== undefined || state.current.dl !== undefined;
  const pre = useMemo(() => {
    const w = new Worker("./script/pre.js");
    w.onmessage = (ev: MessageEvent) => {
      if (isPocConvertChunkMessage(ev.data)) {
        if (ev.data.id === session.current?.id) {
          session.current.roundRobin(ev.data);
        }
      } else if (isPocConvertQueueingFinishedMessage(ev.data)) {
        if (ev.data.id === session.current?.id) {
          session.current.markQueueingFinished();
        }
      }
    };
    return w;
  }, []);
  const post = useMemo(() => {
    return new Worker("./script/post.js");
  }, []);
  const workers = useMemo(() => {
    const num = navigator.hardwareConcurrency;
    const a: Worker[] = [];
    for (let i = 0; i < num; i++) {
      const w = new Worker("./script/chunk.js");
      const name: PocYourNameMessage = {
        type: "your_name",
        name: `${i}`,
      };
      w.onmessage = (ev: MessageEvent) => {
        if (isPocChunkConvertDoneMessage(ev.data)) {
          if (session.current?.id === ev.data.id) {
            session.current.incrementDone();
          }
        }
      };
      w.postMessage(name);
      a.push(w);
    }
    return a;
  }, []);
  const onStartPoc = () => {
    const id = uuidv4();
    const s = new ConvertSession(id, pre, workers, post);
    session.current = s;
    s.start();
  };
  return (
    <div className="main">
      <Header disableLink={disableLink} />
      <div className="container">
        <div onClick={onStartPoc}>start debug</div>
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
      return { ...state, unzip: p };
    case "convert":
      return {
        ...state,
        convert: m.progress,
        convertTotal: m.total,
      };
    case "compaction":
      return { ...state, compaction: p };
    case "zip":
      return { ...state, zip: p };
    case "copy":
      return { ...state, copy: p };
  }
  return { ...state };
}

async function cleanup(id: string) {
  const db = new ChunksStore();
  try {
    const keys: string[] = [];
    await db.chunks.each((item) => {
      const { name } = item;
      if (name.startsWith(`/je2be/dl/${id}/`)) {
        keys.push(name);
      }
    });
    await db.chunks.bulkDelete(keys);
  } catch (e) {
    db.close();
    console.error(e);
    throw e;
  }
  db.close();
}
