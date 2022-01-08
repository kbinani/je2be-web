export function packU8(u: Uint8Array): string {
  if (u.length === 0) {
    return "";
  }
  const magic = u.length % 2 === 0 ? 1 : 0;
  const first = (u[0] << 8) + magic;
  let s = "";
  s += String.fromCharCode(first);
  let i = 1;
  while (i < u.length) {
    let n = u[i];
    i++;
    if (i < u.length) {
      n += u[i] << 8;
      i++;
    }
    s += String.fromCharCode(n);
  }
  return s;
}

export function unpackToU8(s: string): Uint8Array {
  if (s === "") {
    return new Uint8Array();
  }
  const first = s.charCodeAt(0);
  const magic = 0xff & first;
  const bytes = s.length * 2 - 1 - magic;
  const u = new Uint8Array(bytes);
  u[0] = 0xff & (first >> 8);
  let pos = 1;
  for (let i = 1; i < s.length; i++) {
    const code = s.charCodeAt(i);
    u[pos] = 0xff & code;
    pos++;
    if (pos < bytes) {
      u[pos] = 0xff & (code >> 8);
      pos++;
    }
  }
  return u;
}
