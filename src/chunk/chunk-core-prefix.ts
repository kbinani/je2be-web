import { DbBackend } from "../share/db-backend";

const db = new DbBackend();

function put(key: string, value: string) {
  db.storage.put({ key, value }).catch(console.error);
}

globalThis.put = put;
