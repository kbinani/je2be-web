import {
  isFailedMessage,
  isJ2BDoneMessage,
  isProgressMessage,
  ProgressMessage,
  StartJ2BMessage,
  WorkerError,
} from "../share/messages";
import { KvsServer } from "../share/kvs";
import { ServiceWorkerLauncher } from "./service-worker-launcher";
import { Progress, ProgressReducer } from "./state";

export class ConvertSession {
  private readonly converter: Worker;
  private startTime: number = 0;
  private readonly kvs = new KvsServer();
  readonly filename: string;
  private readonly id: string;
  private readonly updateProgress: (reducer: ProgressReducer) => void;
  private readonly onError: (error: WorkerError) => void;
  private readonly onFinish: () => void;

  constructor({
    id,
    fileList,
    updateProgress,
    onError,
    onFinish,
  }: {
    id: string;
    fileList: FileList;
    updateProgress: (reducer: ProgressReducer) => void;
    onError: (error: WorkerError) => void;
    onFinish: () => void;
  }) {
    this.id = id;
    this.updateProgress = updateProgress;
    this.onError = onError;
    this.onFinish = onFinish;
    this.filename = fileList.item(0)!.name;

    const converter = new Worker("./script/converter.js", {
      name: "converter",
    });
    converter.onmessage = (ev: MessageEvent) => {
      const id = this.id;
      if (isProgressMessage(ev.data) && ev.data.id === id) {
        this.updateProgress((progress: Progress) => {
          return nextProgress(progress, ev.data);
        });
      } else if (isJ2BDoneMessage(ev.data) && id === ev.data.id) {
        console.log(`[front] (${this.id}) post done`);
        this.converter.terminate();

        //TODO:
        // const dot = this.filename.lastIndexOf(".");
        let filename = "world.mcworld";
        // if (dot > 0) {
        //   filename = this.filename.substring(0, dot) + ".mcworld";
        // }

        const elapsed = Date.now() - this.startTime;
        console.log(`[front] (${id}) finished in ${elapsed / 1000.0} sec`);

        const sw = new ServiceWorkerLauncher();
        sw.launch().then(() => {
          this.updateProgress((state) => {
            return {
              ...state,
              dl: { id, filename },
              id: undefined,
            };
          });
          this.onFinish();
        });
      } else if (isFailedMessage(ev.data) && id === ev.data.id) {
        this.onError(ev.data.error);
      } else {
        this.kvs.onMessage(ev);
      }
    };
    this.converter = converter;
  }

  close() {
    this.kvs.close();
  }

  start(fileList: FileList) {
    console.log(`[front] (${this.id}) start`);
    const start: StartJ2BMessage = { type: "j2b", id: this.id, fileList };
    this.converter.postMessage(start);
    this.startTime = Date.now();
  }
}

function nextProgress(progress: Progress, m: ProgressMessage): Progress {
  const p = m.progress / m.total;
  const { unzip, convert, compaction } = progress;
  switch (m.stage) {
    case "unzip":
      return { unzip: p, convert: undefined, compaction: undefined };
    case "convert":
      return {
        unzip: 1,
        convert: { num: m.progress, den: m.total },
        compaction: m.progress === m.total ? -1 : progress.compaction,
      };
    case "compaction":
      return { unzip: 1, convert, compaction: p };
  }
  return { unzip, convert, compaction };
}
