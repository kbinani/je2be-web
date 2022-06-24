import {
  isFailedMessage,
  isJ2BDoneMessage,
  isProgressMessage,
  StartJ2BMessage,
  WorkerError,
} from "../share/messages";
import { KvsServer } from "../share/kvs";
import { ServiceWorkerLauncher } from "./service-worker-launcher";
import {
  ConverterMetadata,
  nextProgress,
  Progress,
  ProgressReducer,
} from "../share/progress";

export class ConvertSession {
  private readonly converter: Worker;
  private startTime: number = 0;
  private readonly kvs = new KvsServer();
  private readonly file: File | FileList;
  readonly filename: string;
  private readonly id: string;
  private readonly updateProgress: (reducer: ProgressReducer) => void;
  private readonly onError: (error: WorkerError) => void;
  private readonly onFinish: () => void;
  readonly meta: ConverterMetadata;

  constructor({
    id,
    meta,
    file,
    filename,
    updateProgress,
    onError,
    onFinish,
  }: {
    id: string;
    meta: ConverterMetadata;
    file: File | FileList;
    filename: string;
    updateProgress: (reducer: ProgressReducer) => void;
    onError: (error: WorkerError) => void;
    onFinish: () => void;
  }) {
    this.id = id;
    this.updateProgress = updateProgress;
    this.onError = onError;
    this.onFinish = onFinish;
    this.file = file;
    this.filename = filename;
    this.meta = meta;

    const converter = new Worker("./script/converter.js", {
      name: "converter",
    });
    converter.onmessage = (ev: MessageEvent) => {
      const id = this.id;
      if (isProgressMessage(ev.data) && ev.data.id === id) {
        this.updateProgress((progress: Progress) => {
          return nextProgress(progress, ev.data, this.meta);
        });
      } else if (isJ2BDoneMessage(ev.data) && id === ev.data.id) {
        console.log(`[front] (${this.id}) post done`);
        this.converter.terminate();

        const dot = this.filename.lastIndexOf(".");
        let filename = "world.mcworld";
        if (dot > 0) {
          filename = this.filename.substring(0, dot) + ".mcworld";
        } else {
          filename = this.filename + ".mcworld";
        }

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

  start() {
    console.log(`[front] (${this.id}) start`);
    const start: StartJ2BMessage = {
      type: "j2b",
      id: this.id,
      file: this.file,
    };
    this.converter?.postMessage(start);
    this.startTime = Date.now();
  }
}
