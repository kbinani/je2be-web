export function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}
