import { exists, mkdirp, syncfs } from "../conv/fs-ext";

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
  mkdirp("/je2be");
  FS.mount(IDBFS, {}, "/je2be");
  syncfs(true).catch(console.error);
}

function onFetch(ev: FetchEvent) {
  const method = ev.request.method.toUpperCase();
  if (method !== "GET") {
    return;
  }
  const u = new URL(ev.request.url);
  const path = u.pathname;
  const download = u.searchParams.get("download") ?? "world.mcworld";
  if (!path.startsWith("/dl/")) {
    return;
  }
  ev.respondWith(respond(path, download));
}

async function respond(path: string, download: string): Promise<Response> {
  let fp: any;
  let offset = 0;
  const start = async (controller) => {
    try {
      mkdirp(`/je2be`);
      try {
        FS.mount(IDBFS, {}, `/je2be`);
      } catch (e) {
        console.log(`[sworker] respond; already mounted`);
      }
      await syncfs(true);
      console.log(`[sworker] (${path}) start`);
      const p = `/je2be/${path}`;
      if (!exists(p)) {
        console.log(`[sworker] (${path}) start: file not found`);
        console.error();
        return;
      }
      fp = FS.open(p, "r");
      if (!fp) {
        controller.error();
      }
    } catch (e) {
      controller.error(e);
      console.trace(e);
    }
  };
  const pull = async (controller) => {
    try {
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
    } catch (e) {
      controller.error(e);
      console.trace(e);
    }
  };
  const stream = new ReadableStream({ start, pull });
  const headers = {
    "Content-Type": "application/octet-stream",
    "Cache-Control": "no-cache",
    "Content-Disposition": `attachment; filename=\"${download}\"`,
  };
  return new Response(stream, {
    headers,
  });
}
