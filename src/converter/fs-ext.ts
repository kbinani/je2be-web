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
