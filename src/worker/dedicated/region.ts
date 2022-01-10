import {
  ConvertRegionDoneMessage,
  ConvertRegionMessage,
  isConvertRegionMessage,
} from "../../share/messages";
import { writeI32 } from "../../share/heap";
import { mkdirp, mount, unmount } from "../../share/fs-ext";
import { KvsClient } from "../../share/kvs";

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
  const { id, rx, rz, dim, chunks, javaEditionMap } = m;
  const root = `/je2be/${id}/in`;
  let worldDir: string;
  switch (dim) {
    case 2:
      worldDir = `${root}/DIM1`;
      break;
    case 1:
      worldDir = `${root}/DIM-1`;
      break;
    case 0:
    default:
      worldDir = `${root}`;
      break;
  }

  mkdirp(`${worldDir}/region`);
  const files: File[] = [];
  for (const chunk of chunks) {
    const { cx, cz } = chunk;
    const name = `${worldDir}/region/c.${cx}.${cz}.nbt.z`;
    const file = await sKvs.file(name);
    if (!file) {
      console.warn(`[region] (${id}) ${name} not found`);
      return;
    }
    const renamed = `region/c.${cx}.${cz}.nbt.z`;
    files.push(new File([file], renamed));
  }

  const entities = `${worldDir}/entities/r.${rx}.${rz}.mca`;
  const entitiesFile = await sKvs.file(entities);
  if (entitiesFile) {
    const renamed = `entities/r.${rx}.${rz}.mca`;
    files.push(new File([entitiesFile], renamed));
  }

  mkdirp("/wfs");
  mount("worker", "/wfs", { files });

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
  const del: Promise<void>[] = [];
  for (let x = 1; x <= 30; x++) {
    for (let z = 1; z <= 30; z++) {
      const cx = rx * 32 + x;
      const cz = rz * 32 + z;
      const name = `${worldDir}/region/c.${cx}.${cz}.nbt.z`;
      del.push(sKvs.del(name));
    }
  }
  await Promise.all(del);
  Module.RemoveAll(`/je2be`);
  unmount("/wfs");
  const done: ConvertRegionDoneMessage = { type: "region_done", id };
  self.postMessage(done);
}
