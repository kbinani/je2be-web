export function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

export function swapInt32(v: number) {
  return (
    (0xff000000 & (v << 24)) |
    (0x00ff0000 & (v << 8)) |
    (0x0000ff00 & (v >> 8)) |
    (0x000000ff & (v >> 24))
  );
}
