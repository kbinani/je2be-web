import Dexie, { Table } from "dexie";

export interface Pair {
  key: Uint8Array;
  value: Uint8Array;
}

export class DbBackend extends Dexie {
  storage!: Table<Pair>;

  constructor() {
    super("je2be-idb");
    this.version(1).stores({
      storage: "&key,value",
    });
  }
}
