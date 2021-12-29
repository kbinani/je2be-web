import { mkdirp, syncfs } from "../conv/fs-ext";

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("fetch", onFetch);

self.importScripts("script/core.js");

function onInstall(ev) {
  console.log(`[sworker] install`);
  //@ts-ignore
  ev.waitUntil(self.skipWaiting());
}

function onActivate(ev) {
  console.log(`[sworker] activate`);
  //@ts-ignore
  ev.waitUntil(self.clients.claim());
}

function onFetch(ev: FetchEvent) {
  console.log(`[sworker] fetch`);
  const method = ev.request.method.toUpperCase();
  if (method !== "GET") {
    return;
  }
  const url = ev.request.url;
  const sworker = self.location.href;
  const idx = sworker.lastIndexOf("/sworker.js");
  if (idx < 0) {
    return;
  }
  const prefix = url.substring(0, idx);
  const path = url.substring(prefix.length);
  if (!path.startsWith("/dl/")) {
    return;
  }
  ev.respondWith(respond(path));
}

async function respond(path: string): Promise<Response> {
  mkdirp("/je2be");
  FS.mount(IDBFS, {}, "/je2be");
  await syncfs(true);
  let fp: any;
  let offset = 0;
  const start = (controller) => {
    console.log(`[sworker] (${path}) start`);
    fp = FS.open(`/je2be/${path}`, "r");
    if (!fp) {
      controller.error();
    }
  };
  const pull = async (controller) => {
    if (offset === 0) {
      console.log(`[sworker] (${path}) pull: started`);
    }
    try {
      const buffer = new Uint8Array(1048576);
      const read = FS.read(fp, buffer, 0, buffer.byteLength, offset);
      controller.enqueue(buffer.slice(0, read));
      if (read < buffer.byteLength) {
        console.log(`[sworker] (${path}) pull: close`);
        controller.close();
      }
      offset += read;
    } catch (e) {
      console.log(`[sworker] (${path}) pull: error`);
      controller.error(e);
    }
  };
  const stream = new ReadableStream({ start, pull });
  const headers = {
    "Content-Type": "application/octet-stream",
    "Cache-Control": "no-cache",
    "Content-Disposition": "attachment",
  };
  return new Response(stream, {
    headers,
  });
}
