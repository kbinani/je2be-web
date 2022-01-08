import Dexie, { Table } from "dexie";

export interface File {
  path: string;
  data: Uint8Array;
}

export class FileStorage extends Dexie {
  files!: Table<File>;

  constructor() {
    super("je2be-fs");
    this.version(1).stores({
      files: "&path,data",
    });
  }
}
