import { downloadZip } from "../../../deps/client-zip/src";
import { KvsClient } from "../../share/kvs";
import { unpackToU8 } from "../../share/string";

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
  const action = u.searchParams.get("action");
  if (action === "download") {
    const filename = u.searchParams.get("filename") ?? "world.mcworld";
    ev.respondWith(respondDownload(id, filename));
  }
}

async function* eachFilesWithPrefix(prefix: string): AsyncIterable<File> {
  const fs = new KvsClient();
  const files = await fs.keys({ withPrefix: prefix });
  for (const path of files) {
    const data = unpackToU8(await fs.get(path));
    yield new File([new Blob([data])], path.substring(prefix.length));
  }
}

async function respondDownload(
  id: string,
  filename: string
): Promise<Response> {
  const prefix = `/je2be/${id}/out/`;
  return downloadZip(eachFilesWithPrefix(prefix), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Cache-Control": "no-cache",
      "Content-Disposition": `attachment; filename=\"${filename}\"`,
    },
  });
}
