export function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

export function swapInt32(v: number) {
  let r = v << 24;
  r |= (v & 0x0000ff00) << 8;
  r |= (v & 0x00ff0000) >> 8;
  r |= v >> 24;
  return r;
}
