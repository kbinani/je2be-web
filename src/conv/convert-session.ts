import {
  PocConvertRegionMessage,
  PocStartPostMessage,
  PocStartPreMessage,
} from "../share/messages";

export class ConvertSession {
  private count = 0;
  private finalCount = 0;
  private done_ = 0;
  private queued = 0;
  private readonly active: boolean[];
  private buffer: PocConvertRegionMessage[] = [];
  private _numTotalChunks = -1;

  constructor(
    readonly id: string,
    readonly pre: Worker,
    readonly workers: Worker[],
    readonly post: Worker
  ) {
    this.active = [];
    for (let i = 0; i < workers.length; i++) {
      this.active.push(false);
    }
  }

  get numTotalChunks(): number {
    return this._numTotalChunks;
  }

  setNumTotalChunks(n: number) {
    this._numTotalChunks = n;
  }

  start(file: File) {
    console.log(`[front] (${this.id}) start`);
    const start: PocStartPreMessage = { type: "pre", id: this.id, file };
    this.pre.postMessage(start);
  }

  queue(m: PocConvertRegionMessage) {
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
    this.finalCount = this.count;
  }

  done(worker: Worker): number {
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
      const m: PocStartPostMessage = {
        type: "post",
        id: this.id,
      };
      this.post.postMessage(m);
    }
    return this.done_;
  }

  markPostDone() {
    console.log(`[front] (${this.id}) post done`);
  }
}
