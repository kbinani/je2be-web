import Dexie, { Table } from "dexie";

export type FileMeta = {
  name: string;
  url: string;
};

export interface Dl {
  id: string;
  files: FileMeta[];
}

export class DlStore extends Dexie {
  dlFiles!: Table<Dl>;

  constructor() {
    super("je2be-dlv2");
    this.version(1).stores({
      dlFiles: "&id,files",
    });
  }
}
