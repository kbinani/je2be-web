export function ReadI32(ptr: number): number {
  let v = 0;
  for (let i = 0; i < 4; i++) {
    v = v * 256 + Module.HEAPU8[ptr + 3 - i];
  }
  return v;
}

export function WriteI32(ptr: number, i32: number) {
  let v = i32;
  for (let i = 0; i < 4; i++) {
    Module.HEAPU8[ptr + i] = 0xff & v;
    v = v >> 8;
  }
}
