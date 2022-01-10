export function readI32(ptr: number, heap: Uint8Array = Module.HEAPU8): number {
  let v = 0;
  for (let i = 0; i < 4; i++) {
    v = v * 256 + heap[ptr + 3 - i];
  }
  return v;
}

export function writeI32(ptr: number, i32: number, heap = Module.HEAPU8) {
  let v = i32;
  for (let i = 0; i < 4; i++) {
    heap[ptr + i] = 0xff & v;
    v = v >> 8;
  }
}
