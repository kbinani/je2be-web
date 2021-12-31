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
  if (sub === "") {
    if (!pathname.startsWith("/dl")) {
      console.log(5);
      return;
    }
  } else {
    if (!pathname.startsWith(`${sub}/dl`)) {
      console.log(6);
      return;
    }
  }
  const id = u.pathname.substring(sub.length);
  const download = u.searchParams.get("download") ?? "world.mcworld";
  ev.respondWith(respond(id, download));
}

async function respond(id: string, download: string): Promise<Response> {
  const start = async (controller) => {
    mkdirp("/je2be");
    try {
      mount("/je2be");
      await syncfs(true);
    } catch (e) {
      console.log(`[sworker] respond; already mounted`, e);
    }
    console.log(`[sworker] (${id}) start`);
    const p = `/je2be/${id}`;
    if (!exists(p)) {
      controller.error();
      console.log(`[sworker] (${id}) start: directory not found`);
      umount("/je2be");
      return;
    }
  };
  let count = 0;
  const pull = async (controller) => {
    console.log(`pull: desiredSize=${controller.desiredSize}`);
    console.log(controller.byobRequest);
    if (controller.desiredSize <= 0) {
      return;
    }
    console.log(`[sworker] (${id}) send chunk #${count}`);
    const name = `/je2be/${id}/${count}.zip`;
    if (!exists(name)) {
      console.log(`[sworker] (${id}) pull: close`);
      controller.close();
      umount("/je2be");
      return;
    }
    try {
      const buffer = FS.readFile(name);
      controller.enqueue(buffer);
    } catch (e) {
      console.log(`[sworker] (${id}) pull: error`, e);
      controller.error(e);
      umount("/je2be");
      return;
    }
    count++;
  };
  //@ts-ignore
  const stream = new ReadableStream({ start, pull, type: "bytes" });
  const headers = {
    "Content-Type": "application/octet-stream",
    "Cache-Control": "no-cache",
    "Content-Disposition": `attachment; filename=\"${download}\"`,
  };
  return new Response(stream, {
    headers,
  });
}
