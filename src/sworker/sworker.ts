self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("fetch", onFetch);

function onInstall() {
  console.log(`[sworker] install`);
}

function onActivate() {
  console.log(`[sworker] activate`);
}

function onFetch(ev: FetchEvent) {
  console.log(`[sworker] fetch`);
}
