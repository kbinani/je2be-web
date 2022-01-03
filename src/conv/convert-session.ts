import { PocConvertChunkMessage, PocStartPreMessage } from "./pre";
import { PocStartPostMessage } from "./post";

export class ConvertSession {
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
    const start: PocStartPreMessage = { type: "pre", id: this.id };
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
      console.log(`[front] (${this.id}) all chunk conversion finished`);
      const m: PocStartPostMessage = {
        type: "post",
        id: this.id,
      };
      this.post.postMessage(m);
    }
  }

  markPostDone() {
    console.log(`[front] (${this.id}) post done`);
  }
}
