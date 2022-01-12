import {
  ConvertRegionDoneMessage,
  ConvertRegionMessage,
  isConvertRegionMessage,
} from "../../share/messages";
import { writeI32 } from "../../share/heap";
import { exists, mkdirp, readFile } from "../../share/fs-ext";
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

  if (!exists("/wfs")) {
    await mountFilesAsWorkerFs({
      kvs: sKvs,
      prefix: `/je2be/${id}/in`,
      mountPoint: "/wfs",
    });
  }

  let worldDir = "/wfs";
  if (dim === 1) {
    worldDir = "/wfs/DIM-1";
  } else if (dim === 2) {
    worldDir = "/wfs/DIM1";
  }

  const storage = Module._malloc(javaEditionMap.length * 4);
  for (let i = 0; i < javaEditionMap.length; i++) {
    writeI32(storage + i * 4, javaEditionMap[i]);
  }
  const wdDir = `/je2be/${id}/wd/${dim}`;
  mkdirp(wdDir);
  //string id, string worldDirString, int rx, int rz, int dim, intptr_t javaEditionMap, int javaEditionMapSize
  const ok = Module.ConvertRegion(
    id,
    worldDir,
    rx,
    rz,
    dim,
    storage,
    javaEditionMap.length
  );
  if (!ok) {
    console.error(`[region] (${id}) ConvertRegion failed`);
    return;
  }
  const path = `${wdDir}/r.${rx}.${rz}.nbt`;
  const data = readFile(path);
  await sKvs.put(path, data);

  Module.RemoveAll(`/je2be`);
  const done: ConvertRegionDoneMessage = { type: "region_done", id };
  self.postMessage(done);
}