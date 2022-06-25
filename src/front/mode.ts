export type ConvertMode = "j2b" | "b2j" | "x2b" | "x2j";
export type Mode = "select" | ConvertMode;

export function convertModeSupportsDirectoryInput(mode: ConvertMode): boolean {
  return mode === "j2b" || mode == "b2j";
}

export function convertModeInputFileExtension(mode: ConvertMode): string {
  switch (mode) {
    case "j2b":
      return ".zip";
    case "b2j":
      return ".mcworld";
    case "x2j":
    case "x2b":
      return ".bin";
  }
}

export function convertModeOutputFileExtension(mode: ConvertMode): string {
  switch (mode) {
    case "j2b":
    case "x2b":
      return ".mcworld";
    case "b2j":
    case "x2j":
      return ".zip";
  }
}
