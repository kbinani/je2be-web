import {
  DoneMessage,
  FailedMessage,
  isProgressMessage,
  isStartMessage,
  isWorkerError,
  ProgressMessage,
  StartMessage,
  WorkerError,
} from "../../share/messages";
import {
  dirname,
  iterate,
  mkdirp,
  readFile,
  unlink,
  writeFile,
} from "../../share/fs-ext";
import JSZip from "jszip";
import { promiseUnzipFileInZip } from "../../share/zip-ext";
import { defer, KvsClient } from "../../share/kvs";
import { DlStore, FileMeta } from "../../share/dl";
import { directoryNameFromFileList } from "../../share/file-list-ext";

function errorCatcher(id: string): (e: any) => void {
  return (e: any) => {
    if (isWorkerError(e)) {
      const m: FailedMessage = {
        type: "failed",
        id,
        error: e,
      };
      self.postMessage(m);
    } else {
      const m: FailedMessage = {
        type: "failed",
        id,
        error: {
          type: "Other",
          native: {
            name: e?.name,
            message: e?.message,
            stack: e?.stack,
          },
        },
      };
      self.postMessage(m);
    }
  };
}

const sRuntimeInitialized = defer<void>();

self.importScripts("./core.js");
Module.onRuntimeInitialized = () => {
  console.log(`[converter] onRuntimeInitialized`);
  sRuntimeInitialized.resolve();
};

self.addEventListener("message", (ev: MessageEvent) => {
  if (isStartMessage(ev.data)) {
    const { id } = ev.data;
    start(ev.data)
      .catch(errorCatcher(id))
      .finally(() => Module._Deinit());
  } else if (isProgressMessage(ev.data)) {
    self.postMessage(ev.data);
  }
});

const sKvs = new KvsClient();

function StringToUTF8(s: string): any {
  //@ts-ignore
  return allocateUTF8(s);
}

async function readFileAsUint8Array(file: File): Promise<Uint8Array> {
  return new Promise<Uint8Array>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (data) => {
      if (data.target?.result instanceof ArrayBuffer) {
        resolve(new Uint8Array(data.target.result));
      } else {
        reject("cannot read file: " + (file.webkitRelativePath ?? file.name));
      }
    };
    reader.onerror = (e) => {
      reject("cannot read file: " + (file.webkitRelativePath ?? file.name));
    };
    reader.readAsArrayBuffer(file);
  });
}

async function start(m: StartMessage): Promise<void> {
  await sRuntimeInitialized;

  console.log(`[converter] (${m.id}) start`);
  const { id, file, mode } = m;

  const req = indexedDB.deleteDatabase("je2be-dl");
  req.onerror = (e) => console.error(e);
  req.onsuccess = () => {
    console.log(`[converter] deleted legacy "je2be-dl" table`);
  };

  const db = new DlStore();
  await db.dlFiles.clear();

  let inputPath: string;
  if (mode === "j2b" || mode === "b2j") {
    console.log(`[converter] (${id}) extract...`);
    await extract(file, id);
    console.log(`[converter] (${id}) extract done`);
    inputPath = `/je2be/${id}/in`;
  } else {
    if (!(file instanceof File)) {
      throw "invalid input: file should be an File object";
    }
    const buffer = await readFileAsUint8Array(file);
    inputPath = `/je2be/${id}/in/input.bin`;
    mkdirp(dirname(inputPath));
    await writeFile(inputPath, buffer);
  }

  console.log(`[converter] (${id}) convert...`);
  await mkdirp(`/je2be/${id}/out`);

  Module._Init();

  const inputPtr = StringToUTF8(inputPath);
  const outputPtr = StringToUTF8(`/je2be/${id}/out`);
  const idPtr = StringToUTF8(id);
  let errorJsonPtr: number = 0;
  switch (mode) {
    case "j2b":
      errorJsonPtr = Module._JavaToBedrock(inputPtr, outputPtr, idPtr);
      break;
    case "b2j":
      errorJsonPtr = Module._BedrockToJava(inputPtr, outputPtr, idPtr);
      break;
    case "x2j":
      errorJsonPtr = Module._Xbox360ToJava(inputPtr, outputPtr, idPtr);
      break;
    case "x2b":
      errorJsonPtr = Module._Xbox360ToBedrock(inputPtr, outputPtr, idPtr);
      break;
  }
  if (errorJsonPtr != 0) {
    const errorJsonString = UTF8ToString(errorJsonPtr);
    const error = JSON.parse(errorJsonString);
    const where = error["where"];
    let stack: string | undefined;
    if (where) {
      const file = where["file"];
      const line = where["line"];
      stack = `file: ${file}; line: ${line}`;
    }
    const m: FailedMessage = {
      id,
      type: "failed",
      error: {
        type: "ConverterFailed",
        native: { message: error["what"], stack },
      },
    };
    self.postMessage(m);

    Module._free(errorJsonPtr);
    return;
  }
  Module._free(inputPtr);
  Module._free(outputPtr);
  Module._free(idPtr);
  console.log(`[converter] (${id}) convert done`);

  await collectOutputFiles(id);

  const done: DoneMessage = { type: "done", id };
  self.postMessage(done);
}

async function extract(file: File | FileList, id: string): Promise<void> {
  if (file instanceof File) {
    await extractZip(file, id);
  } else {
    await copyDirectory(file, id);
  }
}

async function copyDirectory(file: FileList, id: string): Promise<void> {
  let prefix = directoryNameFromFileList(file);
  if (prefix === undefined) {
    const e: WorkerError = {
      type: "Other",
      native: { message: "can't get directory name from FileList" },
    };
    throw e;
  }
  prefix += "/";
  const promises: Promise<void>[] = [];
  let progress = 0;
  const total = file.length;
  for (let i = 0; i < file.length; i++) {
    const item = file.item(i);
    if (!item) {
      progress++;
      const m: ProgressMessage = {
        id,
        type: "progress",
        step: "copy",
        progress,
        total,
      };
      self.postMessage(m);
      continue;
    }
    const rel = item.webkitRelativePath.substring(prefix.length);
    const target = `/je2be/${id}/in/${rel}`;
    const promise = readFileAsUint8Array(item)
      .then((buffer) => {
        mkdirp(dirname(target));
        return writeFile(target, buffer);
      })
      .then(() => {
        progress++;
        const m: ProgressMessage = {
          id,
          type: "progress",
          step: "copy",
          progress,
          total,
        };
        self.postMessage(m);
      });
    promises.push(promise);
  }
  await Promise.all(promises);
}

async function extractZip(file: File, id: string): Promise<void> {
  let zip: any;
  try {
    zip = await JSZip.loadAsync(file);
  } catch (native: any) {
    const error: WorkerError = {
      type: "Unzip",
      native: {
        name: native?.name,
        message: native?.message,
        stack: native?.stack,
      },
    };
    throw error;
  }
  const foundLevelDat: string[] = [];
  zip.forEach((p: string) => {
    if (!p.endsWith("level.dat")) {
      return;
    }
    foundLevelDat.push(p);
  });
  if (foundLevelDat.length === 0) {
    const error: WorkerError = {
      type: "NoLevelDatFound",
      native: {},
    };
    throw error;
  } else if (foundLevelDat.length !== 1) {
    const error: WorkerError = {
      type: "2OrMoreLevelDatFound",
      native: {},
    };
    throw error;
  }
  const levelDatPath = foundLevelDat[0];
  const idx = levelDatPath.lastIndexOf("level.dat");
  const prefix = levelDatPath.substring(0, idx);
  const other: string[] = [];
  const mca: string[] = [];
  const entities: string[] = [];
  zip.forEach((path: string, f: JSZip.JSZipObject) => {
    if (!path.startsWith(prefix)) {
      return;
    }
    if (f.dir) {
      return;
    }
    if (path.endsWith(".mca")) {
      if (path.includes("/region/")) {
        mca.push(path);
        return;
      } else if (path.includes("/entities/")) {
        entities.push(path);
        return;
      }
    }
    other.push(path);
  });

  const total = other.length + mca.length + entities.length;
  const m: ProgressMessage = {
    type: "progress",
    id,
    step: "unzip",
    progress: -1,
    total,
  };
  self.postMessage(m);

  let progress = 0;
  const unzipOthers = [...other, ...entities].map(async (path) => {
    const rel = path.substring(prefix.length);
    const target = `/je2be/${id}/in/${rel}`;
    const buffer = await promiseUnzipFileInZip({ zip, path });
    mkdirp(dirname(target));
    await writeFile(target, buffer);

    progress++;
    const m: ProgressMessage = {
      type: "progress",
      id,
      step: "unzip",
      progress,
      total,
    };
    self.postMessage(m);
  });
  await Promise.all(unzipOthers);

  const unzipRegions = mca.map(async (path) => {
    const rel = path.substring(prefix.length);
    const target = `/je2be/${id}/in/${rel}`;
    const buffer = await promiseUnzipFileInZip({ zip, path });
    mkdirp(dirname(target));
    await writeFile(target, buffer);
    progress++;
    const m: ProgressMessage = {
      type: "progress",
      id,
      step: "unzip",
      progress,
      total,
    };
    self.postMessage(m);
  });
  await Promise.all(unzipRegions);
}

async function collectOutputFiles(id: string): Promise<void> {
  const directory = `/je2be/${id}/out`;
  await iterate(directory, async ({ path, dir }) => {
    if (dir) {
      return;
    }
    const data = readFile(path);
    if (!data) {
      throw new Error(`Cannot read file: ${path}`);
    }
    const subpath = path.substring(`${directory}/`.length);
    console.log(`[converter] (${id}) ${subpath} ${data.length} bytes`);
    await sKvs.put(path, data);
    unlink(path);
  });
  const response = await sKvs.files({ withPrefix: `${directory}/` });
  const files: FileMeta[] = response.map((f) => ({
    name: f.file.name,
    url: f.url,
  }));
  const db = new DlStore();
  await db.dlFiles.put({ id, files: files });
}
