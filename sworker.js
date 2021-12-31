(() => {
  // src/conv/fs-ext.ts
  function mkdirp(p) {
    if (!p.startsWith("/")) {
      return;
    }
    const dirs = p.substring(1).split("/");
    for (let i = 1; i <= dirs.length; i++) {
      const pa = "/" + dirs.slice(0, i).join("/");
      if (exists(pa)) {
        continue;
      }
      FS.mkdir(pa);
    }
  }
  function exists(p) {
    try {
      FS.stat(p);
      return true;
    } catch (e) {
      return false;
    }
  }
  async function syncfs(populate) {
    return new Promise((resolve, reject) => {
      FS.syncfs(populate, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  function umount(p) {
    try {
      FS.unmount(p);
      return true;
    } catch (e) {
      console.error(e);
    }
    return false;
  }
  function mount(p) {
    try {
      FS.mount(IDBFS, {}, p);
      return true;
    } catch (e) {
      console.error(e);
    }
    return false;
  }

  // src/sworker/sworker.ts
  self.addEventListener("install", onInstall);
  self.addEventListener("activate", onActivate);
  self.addEventListener("fetch", onFetch);
  self.importScripts("./script/core.js");
  function onInstall(ev) {
    console.log(`[sworker] install`);
    ev.waitUntil(self.skipWaiting());
  }
  function onActivate(ev) {
    console.log(`[sworker] activate`);
    ev.waitUntil(self.clients.claim());
  }
  function onFetch(ev) {
    var _a;
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
    const download = (_a = u.searchParams.get("download")) != null ? _a : "world.mcworld";
    ev.respondWith(respond(id, download));
  }
  async function respond(id, download) {
    mkdirp("/je2be");
    try {
      mount("/je2be");
      await syncfs(true);
    } catch (e) {
      console.log(`[sworker] respond; already mounted`, e);
    }
    const p = `/je2be/${id}`;
    if (!exists(p)) {
      console.log(`[sworker] (${id}) start: directory not found`);
      umount("/je2be");
      return new Response(void 0, { status: 404 });
    }
    let count = 0;
    const pull = async (controller) => {
      if (controller.desiredSize <= 0) {
        return;
      }
      if (count === 0) {
        console.log(`[sworker] (${id}) pull: start`);
      }
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
    const stream = new ReadableStream({ pull });
    const headers = {
      "Content-Type": "application/octet-stream",
      "Cache-Control": "no-cache",
      "Content-Disposition": `attachment; filename="${download}"`
    };
    return new Response(stream, {
      headers
    });
  }
})();
