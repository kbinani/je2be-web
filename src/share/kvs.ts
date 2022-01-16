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

type FileWithMeta = {
  file: File;
  url: string;
  size: number;
};

export class KvsServer {
  readonly storage = new Map<string, FileWithMeta>();

  close() {
    console.log(`[front] revoking object urls...`);
    this.storage.forEach((entity, key) => {
      URL.revokeObjectURL(entity.url);
    });
    this.storage.clear();
    console.log(`[front] all object urls revoked`);
  }

  ls() {
    const keys = [...this.storage.keys()];
    keys.sort((a, b) => a.localeCompare(b));
    for (const key of keys) {
      console.log(key);
    }
  }

  onMessage(ev: MessageEvent) {
    const { target, data } = ev;
    if (!(target instanceof Worker)) {
      return;
    }
    if (isGetQuery(data)) {
      const { id, key } = data;
      const entity = this.storage.get(key);
      const m: StringResponse = {
        type: "string_response",
        id,
        value: entity?.url,
      };
      target.postMessage(m);
    } else if (isPutQuery(data)) {
      const { id, key, buffer } = data;
      const file = new File([buffer], key);
      const url = URL.createObjectURL(file);
      this.storage.set(key, { url, file, size: buffer.length });
      const m: VoidResponse = { type: "void_response", id };
      target.postMessage(m);
    } else if (isDelQuery(data)) {
      const { id, key } = data;
      const entity = this.storage.get(key);
      if (entity) {
        URL.revokeObjectURL(entity.url);
        this.storage.delete(key);
      }
      const m: VoidResponse = { type: "void_response", id };
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
    } else if (isRemoveKeysWithPrefixQuery(data)) {
      const { id, prefix } = data;
      for (const key of this.storage.keys()) {
        if (key.startsWith(prefix)) {
          const entity = this.storage.get(key);
          if (entity) {
            URL.revokeObjectURL(entity.url);
          }
          this.storage.delete(key);
        }
      }
      const m: VoidResponse = { type: "void_response", id };
      target.postMessage(m);
    } else if (isFileQuery(data)) {
      const { id, key } = data;
      const entity = this.storage.get(key);
      const m: FileResponse = { type: "file_response", id, file: entity };
      target.postMessage(m);
    } else if (isFilesWithPrefixQuery(data)) {
      const { id, prefix } = data;
      const files: FileWithMeta[] = [];
      for (const key of this.storage.keys()) {
        if (key.startsWith(prefix)) {
          const file = this.storage.get(key);
          if (file) {
            files.push(file);
          }
        }
      }
      const m: FilesResponse = { type: "files_response", id, files };
      target.postMessage(m);
    }
  }
}

export class KvsClient {
  private readonly _string = new Map<string, Deferred<string | undefined>>();
  private readonly _void = new Map<string, Deferred<void>>();
  private readonly _strings = new Map<string, Deferred<string[]>>();
  private readonly _file = new Map<
    string,
    Deferred<FileWithMeta | undefined>
  >();
  private readonly _files = new Map<string, Deferred<FileWithMeta[]>>();

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

  async file_(key: string): Promise<FileWithMeta | undefined> {
    const id = uuidv4();
    const d = defer<FileWithMeta | undefined>();
    const m: FileQuery = { type: "file", id, key };
    this._file.set(id, d);
    self.postMessage(m);
    return d;
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

  async files({ withPrefix }: { withPrefix: string }): Promise<FileWithMeta[]> {
    const id = uuidv4();
    const d = defer<FileWithMeta[]>();
    const m: FilesWithPrefixQuery = {
      type: "files_with_prefix",
      id,
      prefix: withPrefix,
    };
    this._files.set(id, d);
    self.postMessage(m);
    return d;
  }

  async removeKeys({ withPrefix }: { withPrefix: string }): Promise<void> {
    const id = uuidv4();
    const d = defer<void>();
    const m: RemoveKeysWithPrefixQuery = {
      id,
      prefix: withPrefix,
      type: "remove_keys_with_prefix",
    };
    this._void.set(id, d);
    self.postMessage(m);
    return d;
  }

  readonly onMessage = (ev: MessageEvent) => {
    if (isStringResponse(ev.data)) {
      const id = ev.data.id;
      const value = ev.data.value;
      const d = this._string.get(id);
      this._string.delete(id);
      d?.resolve(value);
    } else if (isVoidResponse(ev.data)) {
      const id = ev.data.id;
      const d = this._void.get(id);
      this._void.delete(id);
      d?.resolve();
    } else if (isStringsResponse(ev.data)) {
      const id = ev.data.id;
      const d = this._strings.get(id);
      this._strings.delete(id);
      d?.resolve(ev.data.strings);
    } else if (isFileResponse(ev.data)) {
      const id = ev.data.id;
      const d = this._file.get(id);
      this._file.delete(id);
      d?.resolve(ev.data.file);
    } else if (isFilesResponse(ev.data)) {
      const id = ev.data.id;
      const d = this._files.get(id);
      this._files.delete(id);
      d?.resolve(ev.data.files);
    }
  };
}

type FilesResponse = {
  type: "files_response";
  id: string;
  files: FileWithMeta[];
};

function isFilesResponse(x: any): x is FilesResponse {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "files_response" &&
    typeof x["id"] === "string" &&
    !!x["files"]
  );
}

type FilesWithPrefixQuery = {
  type: "files_with_prefix";
  id: string;
  prefix: string;
};

function isFilesWithPrefixQuery(x: any): x is FilesWithPrefixQuery {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "files_with_prefix" &&
    typeof x["id"] === "string" &&
    typeof x["prefix"] === "string"
  );
}

type FileQuery = {
  type: "file";
  id: string;
  key: string;
};

function isFileQuery(x: any): x is FileQuery {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "file" &&
    typeof x["id"] === "string" &&
    typeof x["key"] === "string"
  );
}

type RemoveKeysWithPrefixQuery = {
  type: "remove_keys_with_prefix";
  id: string;
  prefix: string;
};

function isRemoveKeysWithPrefixQuery(x: any): x is RemoveKeysWithPrefixQuery {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "remove_keys_with_prefix" &&
    typeof x["id"] === "string" &&
    typeof x["prefix"] === "string"
  );
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

type FileResponse = {
  type: "file_response";
  id: string;
  file: FileWithMeta | undefined;
};

function isFileResponse(x: any): x is FileResponse {
  if (!x) {
    return false;
  }
  return x["type"] === "file_response" && typeof x["id"] === "string";
}
