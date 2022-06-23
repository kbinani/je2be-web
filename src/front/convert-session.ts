import {
  isPostDoneMessage,
  isProgressMessage,
  ProgressMessage,
  StartPreMessage,
} from "../share/messages";
import { MainComponentState, MainComponentStateReducer } from "./main";
import { KvsServer } from "../share/kvs";
import { ServiceWorkerLauncher } from "./service-worker-launcher";

export class ConvertSession {
  private readonly converter: Worker;
  private startTime: number = 0;
  private readonly kvs = new KvsServer();
  private readonly filename: string;
  private readonly filesize: number;

  constructor(
    readonly id: string,
    file: File,
    readonly reduce: (
      reducer: MainComponentStateReducer,
      forceUpdate: boolean
    ) => void
  ) {
    this.filename = file.name;
    this.filesize = file.size;

    const converter = new Worker("./script/converter.js", {
      name: "converter",
    });
    converter.onmessage = (ev: MessageEvent) => {
      const id = this.id;
      if (isProgressMessage(ev.data) && ev.data.id === id) {
        this.reduce((state: MainComponentState) => {
          return updateProgress(state, ev.data);
        }, true);
      } else if (isPostDoneMessage(ev.data) && id === ev.data.id) {
        console.log(`[front] (${this.id}) post done`);
        this.converter.terminate();

        const dot = this.filename.lastIndexOf(".");
        let filename = "world.mcworld";
        if (dot > 0) {
          filename = this.filename.substring(0, dot) + ".mcworld";
        }

        const elapsed = Date.now() - this.startTime;
        console.log(`[front] (${id}) finished in ${elapsed / 1000.0} sec`);

        const sw = new ServiceWorkerLauncher();
        sw.launch().then(() => {
          this.reduce((state) => {
            return {
              ...state,
              dl: { id, filename },
              id: undefined,
            };
          }, true);
        });
      } else {
        this.kvs.onMessage(ev);
      }
    };
    this.converter = converter;
  }

  close() {
    this.kvs.close();
  }

  start(file: File) {
    console.log(`[front] (${this.id}) start`);
    const start: StartPreMessage = { type: "pre", id: this.id, file };
    this.converter.postMessage(start);
    this.startTime = Date.now();
  }
}

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
      return { ...state, compaction: p };
  }
  return { ...state };
}
