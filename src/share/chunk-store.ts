import Dexie, { Table } from "dexie";

export interface Chunk {
  name: string;
  data: Uint8Array;
}

export class ChunksStore extends Dexie {
  chunks!: Table<Chunk>;

  constructor() {
    super("je2be-dl");
    this.version(1).stores({
      chunks: "name",
    });
  }
}
