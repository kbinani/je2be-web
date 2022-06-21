export class ServiceWorkerLauncher {
  readonly scope: string;
  readonly url = "./sworker.js";

  constructor() {
    const { protocol, host, href } = window.location;
    const prefix = `${protocol}//${host}/`;
    const path = href.substring(prefix.length);
    this.scope = `/${path}dl`;
  }

  async launch(): Promise<ServiceWorkerRegistration> {
    console.log(`scope=${this.scope}`);
    const registration = await navigator.serviceWorker.register(this.url, {
      scope: this.scope,
    });
    await registration.update();
    if (registration.active) {
      return registration;
    }
    throw new Error("Cannot start service worker");
  }
}
