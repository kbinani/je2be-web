import { DbBackend } from "../share/db-backend";

const db = new DbBackend();

function PutToDb(key: Uint8Array, value: Uint8Array) {
  db.storage.put({ key, value }).catch(console.error);
}

globalThis.PutToDb = PutToDb;
