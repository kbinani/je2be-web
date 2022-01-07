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
    FS.syncfs(populate, (err) => {
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
  callback: ({ path: string, dir: boolean }) => Promise<void>
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
  await visit(FS.lookupPath(directory));
}
