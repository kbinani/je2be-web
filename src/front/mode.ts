export type ConvertMode = "j2b" | "b2j" | "x2b" | "x2j";
export type Mode = "select" | ConvertMode;

export function convertModeSupportsDirectoryInput(mode: ConvertMode): boolean {
  return mode === "j2b" || mode == "b2j";
}
