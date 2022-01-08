import { v4 as uuidv4 } from "uuid";

export interface Deferred<T> extends Promise<T> {
  resolve(v: T): void;
  reject(e: any): void;
}

export function defer<T = void>(): Deferred<T> {
  let resolve = (v: T) => {};
  let reject = (e: any) => {};
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return Object.assign(promise, { resolve, reject });
}

export class KvsServer {
  readonly storage = new Map<string, string>();

  close() {
    console.log(`[front] revoking object urls`);
    this.storage.forEach((key, objectUrl) => {
      URL.revokeObjectURL(objectUrl);
    });
  }

  onMessage(ev: MessageEvent) {
    const { target, data } = ev;
    if (!(target instanceof Worker)) {
      return;
    }
    if (isGetQuery(data)) {
      const { id, key } = data;
      const value = this.storage.get(key);
      const m: StringResponse = {
        type: "string_response",
        id,
        value,
      };
      target.postMessage(m);
    } else if (isPutQuery(data)) {
      const { id, key, buffer } = data;
      const blob = new Blob([buffer]);
      const url = URL.createObjectURL(blob);
      this.storage.set(key, url);
      const m: VoidResponse = {
        type: "void_response",
        id,
      };
      target.postMessage(m);
    } else if (isDelQuery(data)) {
      const { id, key } = data;
      const url = this.storage.get(key);
      URL.revokeObjectURL(url);
      this.storage.delete(key);
      const m: VoidResponse = {
        type: "void_response",
        id,
      };
      target.postMessage(m);
    } else if (isKeysWithPrefixQuery(data)) {
      const { id, prefix } = data;
      const keys: string[] = [];
      for (const key of this.storage.keys()) {
        if (key.startsWith(prefix)) {
          keys.push(key);
        }
      }
      const m: StringsResponse = {
        type: "strings_response",
        id,
        strings: keys,
      };
      target.postMessage(m);
    }
  }
}

export class KvsClient {
  private readonly _string = new Map<string, Deferred<string | undefined>>();
  private readonly _void = new Map<string, Deferred<void>>();
  private readonly _strings = new Map<string, Deferred<string[]>>();

  constructor() {
    self.addEventListener("message", this.onMessage);
  }

  async get(key: string): Promise<Uint8Array | undefined> {
    const id = uuidv4();
    const d = defer<string | undefined>();
    const m: GetQuery = {
      type: "get",
      id,
      key,
    };
    this._string.set(id, d);
    self.postMessage(m);
    return d.then(async (url) => {
      if (url === undefined) {
        return undefined;
      }
      const res = await fetch(url);
      const buffer = await res.arrayBuffer();
      return new Uint8Array(buffer);
    });
  }

  async put(key: string, value: Uint8Array): Promise<void> {
    const id = uuidv4();
    const d = defer<void>();
    const m: PutQuery = {
      type: "put",
      id,
      key,
      buffer: value,
    };
    this._void.set(id, d);
    self.postMessage(m);
    return d;
  }

  async del(key: string): Promise<void> {
    const id = uuidv4();
    const d = defer<void>();
    const m: DelQuery = {
      type: "del",
      id,
      key,
    };
    this._void.set(id, d);
    self.postMessage(m);
    return d;
  }

  async keys({ withPrefix }: { withPrefix: string }): Promise<string[]> {
    const id = uuidv4();
    const d = defer<string[]>();
    const m: KeysWithPrefixQuery = {
      type: "keys_with_prefix",
      id,
      prefix: withPrefix,
    };
    this._strings.set(id, d);
    self.postMessage(m);
    return d;
  }

  readonly onMessage = (ev: MessageEvent) => {
    if (isStringResponse(ev.data)) {
      const id = ev.data.id;
      const value = ev.data.value;
      const d = this._string.get(id);
      d?.resolve(value);
    } else if (isVoidResponse(ev.data)) {
      const id = ev.data.id;
      const d = this._void.get(id);
      d?.resolve();
    } else if (isStringsResponse(ev.data)) {
      const id = ev.data.id;
      const d = this._strings.get(id);
      d?.resolve(ev.data.strings);
    }
  };
}

type KeysWithPrefixQuery = {
  type: "keys_with_prefix";
  id: string;
  prefix: string;
};

function isKeysWithPrefixQuery(x: any): x is KeysWithPrefixQuery {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "keys_with_prefix" &&
    typeof x["id"] === "string" &&
    typeof x["prefix"] === "string"
  );
}

type GetQuery = {
  type: "get";
  id: string;
  key: string;
};

function isGetQuery(x: any): x is GetQuery {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "get" &&
    typeof x["id"] === "string" &&
    typeof x["key"] === "string"
  );
}

type PutQuery = {
  type: "put";
  id: string;
  key: string;
  buffer: Uint8Array;
};

function isPutQuery(x: any): x is PutQuery {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "put" &&
    typeof x["id"] === "string" &&
    typeof x["key"] === "string" &&
    !!x["buffer"]
  );
}

type DelQuery = {
  type: "del";
  id: string;
  key: string;
};

function isDelQuery(x: any): x is DelQuery {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "del" &&
    typeof x["id"] === "string" &&
    typeof x["key"] === "string"
  );
}

type StringResponse = {
  type: "string_response";
  id: string;
  value: string | undefined;
};

function isStringResponse(x: any): x is StringResponse {
  if (!x) {
    return false;
  }
  return x["type"] === "string_response" && typeof x["id"] === "string";
}

type VoidResponse = {
  type: "void_response";
  id: string;
};

function isVoidResponse(x: any): x is VoidResponse {
  if (!x) {
    return false;
  }
  return x["type"] === "void_response" && typeof x["id"] === "string";
}

type StringsResponse = {
  type: "strings_response";
  id: string;
  strings: string[];
};

function isStringsResponse(x: any): x is StringsResponse {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "strings_response" &&
    typeof x["id"] === "string" &&
    !!x["strings"]
  );
}
