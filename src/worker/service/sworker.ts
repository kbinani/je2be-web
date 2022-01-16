import { downloadZip } from "../../../deps/client-zip/src";
import { DlStore, FileMeta } from "../../share/dl";

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
//@ts-ignore
self.addEventListener("fetch", onFetch);

function onInstall(ev: any) {
  console.log(`[sworker] install`);
  //@ts-ignore
  ev.waitUntil(self.skipWaiting());
}

function onActivate(ev: any) {
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

async function* objectUrlsAsFile(
  files: FileMeta[],
  prefix: string
): AsyncIterable<File> {
  for (const file of files) {
    const { name, url } = file;
    const res = await fetch(url);
    const blob = await res.blob();
    yield new File([blob], name.substring(prefix.length));
  }
}

async function respondDownload(
  id: string,
  filename: string
): Promise<Response> {
  const prefix = `/je2be/${id}/out/`;
  const db = new DlStore();
  const response = await db.dlFiles.get(id);
  if (!response) {
    return new Response(null, { status: 404 });
  }
  return downloadZip(objectUrlsAsFile(response.files, prefix), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Cache-Control": "no-cache",
      "Content-Disposition": `attachment; filename=\"${filename}\"`,
    },
  });
}
