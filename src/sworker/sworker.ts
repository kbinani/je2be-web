import {
  exists,
  fclose,
  fread,
  mkdirp,
  mount,
  syncfs,
  umount,
} from "../conv/fs-ext";

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("fetch", onFetch);

self.importScripts("./script/core.js");

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
  const method = ev.request.method.toUpperCase();
  if (method !== "GET") {
    console.log(1);
    return;
  }
  const { href, protocol, host } = location;
  const idx = href.indexOf("/sworker.js");
  const prefix = `${protocol}//${host}`;
  if (!href.startsWith(prefix)) {
    console.log(2);
    return;
  }
  if (idx < prefix.length) {
    console.log(3);
    return;
  }
  const sub = href.substring(prefix.length, idx);
  const u = new URL(ev.request.url);
  if (!u.href.startsWith(prefix)) {
    console.log(4);
    return;
  }
  const pathname = u.pathname;
  console.log(`prefix=${prefix}; pathname=${pathname}; sub=${sub}`);
  if (sub === "") {
    if (!pathname.startsWith("/dl")) {
      console.log(5);
      return;
    }
  } else {
    if (!pathname.startsWith(`/${sub}/dl`)) {
      console.log(6);
      return;
    }
  }
  const path = u.pathname.substring(sub.length);
  const download = u.searchParams.get("download") ?? "world.mcworld";
  ev.respondWith(respond(path, download));
}

async function respond(path: string, download: string): Promise<Response> {
  let fp: any;
  let offset = 0;
  const start = async (controller) => {
    try {
      mkdirp(`/je2be`);
      try {
        mount(`/je2be`);
        await syncfs(true);
      } catch (e) {
        console.log(`[sworker] respond; already mounted`, e);
      }
      console.log(`[sworker] (${path}) start`);
      const p = `/je2be/${path}`;
      if (!exists(p)) {
        console.log(`[sworker] (${path}) start: file not found`);
        umount(`/je2be`);
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
        const read = fread({
          stream: fp,
          buffer,
          size: buffer.byteLength,
          offset,
        });
        controller.enqueue(buffer.slice(0, read));
        if (read < buffer.byteLength) {
          console.log(`[sworker] (${path}) pull: close`);
          controller.close();
          fclose(fp);
          umount(`/je2be`);
        }
        offset += read;
      } catch (e) {
        console.log(`[sworker] (${path}) pull: error`, e);
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
