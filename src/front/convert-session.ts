import {
  ConvertRegionMessage,
  isCompactionProgressDeltaMessage,
  isCompactionQueueMessage,
  isCompactionThreadFinishedMessage,
  isConvertProgressDeltaMessage,
  isConvertQueueingFinishedMessage,
  isConvertRegionDoneMessage,
  isConvertRegionMessage,
  isExportDoneMessage,
  isPostDoneMessage,
  isProgressMessage,
  MergeCompactionMessage,
  ProgressMessage,
  ResultFilesMessage,
  StartPostMessage,
  StartPreMessage,
} from "../share/messages";
import { MainComponentState, MainComponentStateReducer } from "./main";
import { KvsServer } from "../share/kvs";

export class ConvertSession {
  private readonly pre: Worker;
  private readonly workers: Worker[];
  private readonly post: Worker;
  private count = 0;
  private finalCount = 0;
  private done_ = 0;
  private queued = 0;
  private readonly active: boolean[] = [];
  private buffer: ConvertRegionMessage[] = [];
  private _numTotalChunks = -1;
  numDoneChunks = 0;
  lastProgressUpdate: number = 0;
  levelDirectory: string = "";
  private compactionDone = 0;
  private lastSequence = 0;
  private compactionProgress = 0;
  private startTime: number;
  private readonly kvs = new KvsServer();

  constructor(
    readonly id: string,
    readonly file: File,
    readonly sw: ServiceWorker,
    readonly reduce: (
      reducer: MainComponentStateReducer,
      forceUpdate: boolean
    ) => void
  ) {
    const pre = new Worker("./script/pre.js", { name: "pre" });
    pre.onmessage = (ev: MessageEvent) => {
      const id = this.id;
      if (isConvertRegionMessage(ev.data) && ev.data.id === id) {
        this.queue(ev.data);
      } else if (
        isConvertQueueingFinishedMessage(ev.data) &&
        ev.data.id === id
      ) {
        this.markQueueingFinished();
      } else if (isProgressMessage(ev.data) && ev.data.id === id) {
        this.reduce((state: MainComponentState) => {
          return updateProgress(state, ev.data);
        }, true);
      } else if (isExportDoneMessage(ev.data) && ev.data.id === id) {
        this.setNumTotalChunks(ev.data.numTotalChunks);
        this.levelDirectory = ev.data.levelDirectory;
      } else {
        this.kvs.onMessage(ev);
      }
    };
    this.pre = pre;

    const heapLimit = performance["memory"]?.["jsHeapSizeLimit"];
    // "-2" stands for "pre" and "post" workers
    let num = Math.max(4, navigator.hardwareConcurrency - 2);
    if (typeof heapLimit === "number") {
      const approxWorkerRuntimeSize = 300 * 1024 * 1024;
      num = Math.max(4, Math.floor(heapLimit / approxWorkerRuntimeSize)) - 2;
    }
    console.log(`[front] launch ${num} workers`);
    const workers: Worker[] = [];
    for (let i = 0; i < num; i++) {
      const w = new Worker("./script/region.js", { name: `region#${i}` });
      w.onmessage = (ev: MessageEvent) => {
        const target = ev.target;
        if (!(target instanceof Worker)) {
          return;
        }
        const id = this.id;
        if (isConvertRegionDoneMessage(ev.data) && ev.data.id === id) {
          this.done(target);
        } else if (
          isConvertProgressDeltaMessage(ev.data) &&
          ev.data.id === id
        ) {
          this.numDoneChunks += ev.data.delta;
          const progress = this.numDoneChunks;
          const total = this.numTotalChunks;
          const m: ProgressMessage = {
            id,
            type: "progress",
            stage: "convert",
            progress,
            total,
          };
          const now = Date.now();
          let forceUpdate = false;
          if (this.lastProgressUpdate + 1000.0 / 60.0 <= now) {
            this.lastProgressUpdate = now;
            forceUpdate = true;
          }
          this.reduce((state) => {
            return updateProgress(state, m);
          }, forceUpdate);
        } else if (
          isCompactionThreadFinishedMessage(ev.data) &&
          ev.data.id === id
        ) {
          const index = ev.data.index;
          if (0 <= index && index < this.workers.length) {
            this.workers[index].terminate();
          }
          this.compactionDone++;
          if (this.compactionDone === this.workers.length) {
            const m: MergeCompactionMessage = {
              type: "merge_compaction",
              id,
              numWorkers: this.workers.length,
              lastSequence: this.lastSequence,
            };
            this.post.postMessage(m);
          }
        } else if (
          isCompactionProgressDeltaMessage(ev.data) &&
          ev.data.id === id
        ) {
          this.compactionProgress += ev.data.delta;
          const m: ProgressMessage = {
            type: "progress",
            stage: "compaction",
            progress: this.compactionProgress,
            total: this.lastSequence,
            id,
          };
          this.reduce((state) => {
            return updateProgress(state, m);
          }, true);
        } else {
          this.kvs.onMessage(ev);
        }
      };
      workers.push(w);
      this.active.push(false);
    }
    this.workers = workers;

    const post = new Worker("./script/post.js", { name: "post" });
    post.onmessage = (ev: MessageEvent) => {
      const id = this.id;
      if (isProgressMessage(ev.data) && id === ev.data.id) {
        this.reduce((state) => {
          return updateProgress(state, ev.data);
        }, true);
      } else if (isPostDoneMessage(ev.data) && id === ev.data.id) {
        this.markPostDone();
        const dot = this.file.name.lastIndexOf(".");
        let filename = "world.mcworld";
        if (dot > 0) {
          filename = this.file.name.substring(0, dot) + ".mcworld";
        }
        this.post.terminate();
        const elapsed = Date.now() - this.startTime;
        console.log(`[front] (${id}) finished in ${elapsed / 1000.0} sec`);

        const prefix = `/je2be/${id}/out/`;
        const fileNames = [...this.kvs.storage.keys()].filter((path) =>
          path.startsWith(prefix)
        );
        const files: string[][] = [];
        for (const filename of fileNames) {
          const url = this.kvs.storage.get(filename);
          files.push([filename, url]);
        }
        const m: ResultFilesMessage = { type: "result_message", id, files };
        this.sw.postMessage(m);

        this.reduce((state) => {
          return {
            ...state,
            dl: { id, filename },
            id: undefined,
          };
        }, true);
      } else if (isCompactionQueueMessage(ev.data) && id === ev.data.id) {
        const { index, lastSequence } = ev.data;
        if (0 <= index && index < this.workers.length) {
          this.lastSequence = lastSequence;
          const worker = this.workers[index];
          worker.postMessage(ev.data);
        }
      } else {
        this.kvs.onMessage(ev);
      }
    };
    this.post = post;
  }

  close() {
    this.kvs.close();
  }

  get numTotalChunks(): number {
    return this._numTotalChunks;
  }

  setNumTotalChunks(n: number) {
    this._numTotalChunks = n;
  }

  start(file: File) {
    console.log(`[front] (${this.id}) start`);
    const start: StartPreMessage = { type: "pre", id: this.id, file };
    this.pre.postMessage(start);
    this.startTime = Date.now();
  }

  queue(m: ConvertRegionMessage) {
    this.buffer.push(m);
    this.enqueue();
    this.count++;
  }

  private enqueue() {
    if (this.buffer.length === 0) {
      return;
    }
    const length = this.workers.length;
    const index = this.queued % length;
    let queue = -1;
    for (let i = 0; i < length; i++) {
      const idx = (i + index) % length;
      if (!this.active[idx]) {
        queue = idx;
        break;
      }
    }
    if (queue < 0) {
      return;
    }
    const m = this.buffer.shift();
    this.workers[queue].postMessage(m);
    this.active[queue] = true;
    this.queued++;
  }

  markQueueingFinished() {
    console.log(`[front] (${this.id}) all queueing finished`);
    this.pre.terminate();
    this.finalCount = this.count;
  }

  done(worker: Worker) {
    this.done_++;
    for (let i = 0; i < this.workers.length; i++) {
      if (worker === this.workers[i]) {
        this.active[i] = false;
        break;
      }
    }
    this.enqueue();
    if (this.finalCount === this.done_) {
      console.log(`[front] (${this.id}) all chunk conversion finished`);
      const m: StartPostMessage = {
        type: "post",
        id: this.id,
        file: this.file,
        levelDirectory: this.levelDirectory,
        numWorkers: this.workers.length,
      };
      this.post.postMessage(m);
    }
  }

  markPostDone() {
    console.log(`[front] (${this.id}) post done`);
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
    case "copy":
      return { ...state, copy: p };
  }
  return { ...state };
}
