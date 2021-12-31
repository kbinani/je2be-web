import { ChunksStore } from "../share/chunk-store";

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("fetch", onFetch);

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
    return;
  }
  const { href, protocol, host } = location;
  const idx = href.indexOf("/sworker.js");
  const prefix = `${protocol}//${host}`;
  if (!href.startsWith(prefix)) {
    return;
  }
  if (idx < prefix.length) {
    return;
  }
  const sub = href.substring(prefix.length, idx);
  const u = new URL(ev.request.url);
  if (!u.href.startsWith(prefix)) {
    return;
  }
  const pathname = u.pathname;
  const expected = sub === "" ? "/dl/" : `${sub}/dl/`;
  if (!pathname.startsWith(expected)) {
    return;
  }
  const id = pathname.substring(expected.length);
  const download = u.searchParams.get("download") ?? "world.mcworld";
  ev.respondWith(respond(id, download));
}

async function respond(id: string, download: string): Promise<Response> {
  const db = new ChunksStore();
  let count = 0;
  const pull = async (controller) => {
    if (controller.desiredSize <= 0) {
      return;
    }
    if (count === 0) {
      console.log(`[sworker] (${id}) pull: start`);
    }
    const name = `/je2be/dl/${id}/${count}.zip`;
    try {
      const entry = await db.chunks.get({ name });
      if (!entry) {
        controller.close();
        console.log(`[sworker] (${id}) pull: close`);
        controller.close();
        return;
      }
      const buffer: Uint8Array = entry.data;
      controller.enqueue(buffer);
    } catch (e) {
      console.log(`[sworker] (${id}) pull: error`, e);
      controller.error(e);
      return;
    }
    count++;
  };
  const stream = new ReadableStream({ pull });
  const headers = {
    "Content-Type": "application/octet-stream",
    "Cache-Control": "no-cache",
    "Content-Disposition": `attachment; filename=\"${download}\"`,
  };
  return new Response(stream, {
    headers,
  });
}
