import {
  ConvertRegionDoneMessage,
  ConvertRegionMessage,
  isConvertRegionMessage,
} from "../../share/messages";
import { writeI32 } from "../../share/heap";
import { mkdirp, readFile, unmount } from "../../share/fs-ext";
import { KvsClient } from "../../share/kvs";
import { mountFilesAsWorkerFs } from "../../share/kvs-ext";

self.importScripts("./region-wasm.js");

self.addEventListener("message", (ev: MessageEvent) => {
  if (isConvertRegionMessage(ev.data)) {
    startConvertRegion(ev.data);
  }
});

const sKvs = new KvsClient();

function startConvertRegion(m: ConvertRegionMessage) {
  convertRegion(m).catch(console.error);
}

async function convertRegion(m: ConvertRegionMessage): Promise<void> {
  const { id, rx, rz, dim, javaEditionMap } = m;

  await mountFilesAsWorkerFs({
    kvs: sKvs,
    prefix: `/je2be/${id}/in`,
    mountPoint: "/wfs",
  });

  const storage = Module._malloc(javaEditionMap.length * 4);
  for (let i = 0; i < javaEditionMap.length; i++) {
    writeI32(storage + i, javaEditionMap[i]);
  }
  const wdDir = `/je2be/${id}/wd/${dim}`;
  mkdirp(wdDir);
  const ok = Module.ConvertRegion(
    id,
    "/wfs",
    rx,
    rz,
    dim,
    storage,
    javaEditionMap.length
  );
  if (!ok) {
    unmount("/wfs");
    return;
  }
  const path = `${wdDir}/r.${rx}.${rz}.nbt`;
  const data = readFile(path);
  await sKvs.put(path, data);

  Module.RemoveAll(`/je2be`);
  unmount("/wfs");
  const done: ConvertRegionDoneMessage = { type: "region_done", id };
  self.postMessage(done);
}
