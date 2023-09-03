import {
  B2JConverterMetadata,
  ConverterMetadata,
  J2BConverterMetadata,
  X2BConverterMetadata,
  X2JConverterMetadata,
} from "../share/progress";
import { gettext } from "./i18n";

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

export function convertModeMetadata(
  mode: ConvertMode,
  file: boolean,
): ConverterMetadata {
  switch (mode) {
    case "j2b":
      return new J2BConverterMetadata(file);
    case "b2j":
      return new B2JConverterMetadata(file);
    case "x2j":
      return new X2JConverterMetadata();
    case "x2b":
      return new X2BConverterMetadata();
  }
}

export function convertModeDescription(mode: ConvertMode): string {
  switch (mode) {
    case "j2b":
      return gettext("Java to Bedrock");
    case "b2j":
      return gettext("Bedrock to Java");
    case "x2j":
      return gettext("Xbox360 to Java");
    case "x2b":
      return gettext("Xbox360 to Bedrock");
  }
}
