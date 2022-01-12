export class ServiceWorkerLauncher {
  readonly scope: string;

  constructor() {
    const { protocol, host, href } = window.location;
    const prefix = `${protocol}//${host}/`;
    const path = href.substring(prefix.length);
    const scope = `/${path}dl`;
    this.scope = scope;
  }

  async post({
    message,
    launch,
  }: {
    message: any;
    launch: boolean;
  }): Promise<void> {
    const url = "./sworker.js";
    const existing = await navigator.serviceWorker.getRegistration(url);
    if (existing) {
      await existing.update();
      existing.active.postMessage(message);
      return;
    }
    if (!launch) {
      return;
    }
    const registration = await navigator.serviceWorker.register(url, {
      scope: this.scope,
    });
    await registration.update();
    registration.active.postMessage(message);
  }
}
