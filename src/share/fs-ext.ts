export function mkdirp(p: string) {
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

export function dirname(p: string): string {
  const subs = p.split("/");
  return subs.slice(0, subs.length - 1).join("/");
}

export function basename(p: string): string {
  let s = p;
  while (s.endsWith("/")) {
    s = s.substring(0, s.length - 1);
  }
  const subs = p.split("/");
  if (subs.length === 1) {
    return p;
  }
  return subs.pop()!;
}

export function exists(p: string): boolean {
  try {
    FS.stat(p);
    return true;
  } catch (e) {
    return false;
  }
}

export async function syncfs(populate: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    FS.syncfs(populate, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function fclose(fp: any): boolean {
  try {
    FS.close(fp);
    return true;
  } catch (e) {
    console.error(e);
  }
  return false;
}

export function fread({
  stream,
  buffer,
  size,
  offset,
}: {
  stream: any;
  buffer: Uint8Array;
  size: number;
  offset: number;
}) {
  if (size > buffer.byteLength) {
    return false;
  }
  try {
    return FS.read(stream, buffer, 0, size, offset);
  } catch (e) {
    console.error(e);
  }
  return 0;
}

export async function iterate(
  directory: string,
  callback: ({ path, dir }: { path: string; dir: boolean }) => Promise<void>,
): Promise<void> {
  const visit = async (item: any) => {
    const { path, node } = item;
    if (node.isFolder) {
      await callback({ path, dir: true });
      for (const name of Object.keys(node.contents)) {
        const child = node.contents[name];
        const childPath = `${path}/${name}`;
        await visit({ path: childPath, node: child });
      }
    } else if (node.isDevice) {
      return;
    } else {
      await callback({ path, dir: false });
    }
  };
  if (exists(directory)) {
    await visit(FS.lookupPath(directory));
  }
}

export function writeFile(path: string, data: Uint8Array) {
  try {
    return FS.writeFile(path, data);
  } catch (e) {
    console.trace(e);
  }
}

export function readFile(path: string): Uint8Array | undefined {
  try {
    return FS.readFile(path);
  } catch (e) {
    console.trace(e);
  }
}

export function unlink(path: string) {
  try {
    if (exists(path)) {
      FS.unlink(path);
    }
  } catch (e) {
    console.trace(e);
  }
}

export function mount(path: string, options: any = {}) {
  try {
    FS.mount(MEMFS, options, path);
  } catch (e) {
    console.trace(e);
  }
}

export function unmount(path: string) {
  try {
    FS.unmount(path);
  } catch (e) {
    console.trace(e);
  }
}
