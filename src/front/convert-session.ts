import {
  ConvertRegionMessage,
  isConvertProgressDeltaMessage,
  isConvertQueueingFinishedMessage,
  isConvertRegionDoneMessage,
  isConvertRegionMessage,
  isDbPutMessage,
  isExportDoneMessage,
  isPostDoneMessage,
  isProgressMessage,
  ProgressMessage,
  StartPostMessage,
  StartPreMessage,
} from "../share/messages";
import { MainComponentState, MainComponentStateReducer } from "./main";
import { KvsServer } from "../share/kvs";
import { clamp } from "../share/number";
import { ServiceWorkerLauncher } from "./service-worker-launcher";

export class ConvertSession {
  private readonly pre: Worker;
  // private readonly workers: Worker[];
  // private readonly post: Worker;
  // private count = 0;
  // private finalCount = 0;
  // private done_ = 0;
  // private queued = 0;
  // private readonly active: boolean[] = [];
  // private buffer: ConvertRegionMessage[] = [];
  // private _numTotalChunks = -1;
  // numDoneChunks = 0;
  // lastProgressUpdate: number = 0;
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

    const pre = new Worker("./script/pre.js", { name: "pre" });
    pre.onmessage = (ev: MessageEvent) => {
      const id = this.id;
      // console.log(`[front] onmessage: `, ev.data);
      /*if (isConvertRegionMessage(ev.data) && ev.data.id === id) {
        this.queue(ev.data);
      } else if (
        isConvertQueueingFinishedMessage(ev.data) &&
        ev.data.id === id
      ) {
        this.markQueueingFinished();
      } else
      */ if (isProgressMessage(ev.data) && ev.data.id === id) {
        console.log(`[front] progressMessage`, ev.data);
        this.reduce((state: MainComponentState) => {
          return updateProgress(state, ev.data);
        }, true);
      } else if (isExportDoneMessage(ev.data) && ev.data.id === id) {
        // this.setNumTotalChunks(ev.data.numTotalChunks);
      } else if (isPostDoneMessage(ev.data) && id === ev.data.id) {
        console.log(`[front] (${this.id}) post done`);
        // this.post.terminate();

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
    this.pre = pre;

    // const hardwareConcurrency =
    //   typeof navigator.hardwareConcurrency === "number"
    //     ? navigator.hardwareConcurrency
    //     : 8;
    // let maxConcurrency = Math.max(2, hardwareConcurrency);
    // //@ts-ignore
    // const heapLimit = performance["memory"]?.["jsHeapSizeLimit"];
    // if (typeof heapLimit === "number") {
    //   const minimumFileSize = this.filesize * 2;
    //   const approxRuntimeSize = 300 * 1024 * 1024;
    //   const availableMemory = heapLimit - minimumFileSize;
    //   const candidate = Math.floor(availableMemory / approxRuntimeSize);
    //   maxConcurrency = clamp(candidate, 2, navigator.hardwareConcurrency);
    // }
    //
    // const num = maxConcurrency - 1; // pre + num * workers + post
    // console.log(`[front] launch ${num} workers`);
    // const workers: Worker[] = [];
    // for (let i = 0; i < num; i++) {
    //   const w = new Worker("./script/region.js", { name: `region#${i}` });
    //   w.onmessage = (ev: MessageEvent) => {
    //     const target = ev.target;
    //     if (!(target instanceof Worker)) {
    //       return;
    //     }
    //     const id = this.id;
    //     if (isConvertRegionDoneMessage(ev.data) && ev.data.id === id) {
    //       this.done(target);
    //     } else if (
    //       isConvertProgressDeltaMessage(ev.data) &&
    //       ev.data.id === id
    //     ) {
    //       this.numDoneChunks += ev.data.delta;
    //       const progress = this.numDoneChunks;
    //       const total = this.numTotalChunks;
    //       const m: ProgressMessage = {
    //         id,
    //         type: "progress",
    //         stage: "convert",
    //         progress,
    //         total,
    //       };
    //       const now = Date.now();
    //       let forceUpdate = false;
    //       if (this.lastProgressUpdate + 1000.0 / 60.0 <= now) {
    //         this.lastProgressUpdate = now;
    //         forceUpdate = true;
    //       }
    //       this.reduce((state) => {
    //         return updateProgress(state, m);
    //       }, forceUpdate);
    //     } else if (isDbPutMessage(ev.data)) {
    //       this.post.postMessage(ev.data);
    //     } else {
    //       this.kvs.onMessage(ev);
    //     }
    //   };
    //   workers.push(w);
    //   this.active.push(false);
    // }
    // this.workers = workers;

    // const post = new Worker("./script/post.js", { name: "post" });
    // post.onmessage = (ev: MessageEvent) => {
    //   const id = this.id;
    //   if (isProgressMessage(ev.data) && id === ev.data.id) {
    //     this.reduce((state) => {
    //       return updateProgress(state, ev.data);
    //     }, true);
    //   } else if (isPostDoneMessage(ev.data) && id === ev.data.id) {
    //     console.log(`[front] (${this.id}) post done`);
    //     this.post.terminate();
    //
    //     const dot = this.filename.lastIndexOf(".");
    //     let filename = "world.mcworld";
    //     if (dot > 0) {
    //       filename = this.filename.substring(0, dot) + ".mcworld";
    //     }
    //
    //     const elapsed = Date.now() - this.startTime;
    //     console.log(`[front] (${id}) finished in ${elapsed / 1000.0} sec`);
    //
    //     const sw = new ServiceWorkerLauncher();
    //     sw.launch().then(() => {
    //       this.reduce((state) => {
    //         return {
    //           ...state,
    //           dl: { id, filename },
    //           id: undefined,
    //         };
    //       }, true);
    //     });
    //   } else {
    //     this.kvs.onMessage(ev);
    //   }
    // };
    // this.post = post;
  }

  close() {
    this.kvs.close();
  }

  // get numTotalChunks(): number {
  //   return this._numTotalChunks;
  // }
  //
  // setNumTotalChunks(n: number) {
  //   this._numTotalChunks = n;
  // }

  start(file: File) {
    console.log(`[front] (${this.id}) start`);
    const start: StartPreMessage = { type: "pre", id: this.id, file };
    this.pre.postMessage(start);
    this.startTime = Date.now();
  }

  // queue(m: ConvertRegionMessage) {
  //   this.buffer.push(m);
  //   this.enqueue();
  //   this.count++;
  // }

  // private enqueue() {
  // if (this.buffer.length === 0) {
  //   return;
  // }
  // const length = this.workers.length;
  // const index = this.queued % length;
  // let queue = -1;
  // for (let i = 0; i < length; i++) {
  //   const idx = (i + index) % length;
  //   if (!this.active[idx]) {
  //     queue = idx;
  //     break;
  //   }
  // }
  // if (queue < 0) {
  //   return;
  // }
  // const m = this.buffer.shift();
  // this.workers[queue].postMessage(m);
  // this.active[queue] = true;
  // this.queued++;
  // }

  // markQueueingFinished() {
  //   console.log(`[front] (${this.id}) all queueing finished`);
  //   this.pre.terminate();
  //   this.finalCount = this.count;
  // }

  done(worker: Worker) {
    // this.done_++;
    // let idx = -1;
    // for (let i = 0; i < this.workers.length; i++) {
    //   if (worker === this.workers[i]) {
    //     idx = i;
    //     break;
    //   }
    // }
    // if (idx < 0) {
    //   return;
    // }
    // this.active[idx] = false;
    // if (this.buffer.length === 0) {
    //   worker.terminate();
    //   console.log(`[front] (${this.id}) terminate #${idx} worker`);
    // } else {
    //   this.enqueue();
    // }
    // if (this.finalCount === this.done_) {
    //   console.log(`[front] (${this.id}) all chunk conversion finished`);
    //   const m: StartPostMessage = { type: "post", id: this.id };
    //   this.post.postMessage(m);
    // }
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
