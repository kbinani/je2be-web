import { downloadZip } from "../../../deps/client-zip/src";
import {
  isForgetResultFilesMessage,
  isResultFilesMessage,
} from "../../share/messages";

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("fetch", onFetch);
self.addEventListener("message", onMessage);

const sResultFiles = new Map<string, string[][]>();

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

function onMessage(ev: MessageEvent) {
  const message = ev.data;
  if (isResultFilesMessage(message)) {
    const { id, files } = message;
    sResultFiles.set(id, files);
  } else if (isForgetResultFilesMessage(message)) {
    const { id } = message;
    sResultFiles.delete(id);
  }
}

async function* objectUrlsAsFile(
  files: string[][],
  prefix: string
): AsyncIterable<File> {
  for (const file of files) {
    const [name, url] = file;
    const res = await fetch(url);
    const blob = await res.blob();
    yield new File([blob], name.substring(prefix.length));
  }
}

async function respondDownload(
  id: string,
  filename: string
): Promise<Response> {
  const urls = sResultFiles.get(id);
  if ((urls?.length ?? 0) === 0) {
    return new Response(null, { status: 404 });
  }
  const prefix = `/je2be/${id}/out/`;
  return downloadZip(objectUrlsAsFile(urls, prefix), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Cache-Control": "no-cache",
      "Content-Disposition": `attachment; filename=\"${filename}\"`,
    },
  });
}
