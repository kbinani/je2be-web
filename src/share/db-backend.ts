import Dexie, { Table } from "dexie";

export interface Pair {
  key: string;
  value: string;
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
