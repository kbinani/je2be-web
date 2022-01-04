import { DbBackend } from "../share/db-backend";

const db = new DbBackend();

function PutToDb(key: string, value: string) {
  console.log(`PutToDb; key=${key}; value.length=${value.length}`);
  db.storage
    .put({ key, value })
    .then(() => console.log("put done"))
    .catch(console.error);
}

globalThis.PutToDb = PutToDb;
