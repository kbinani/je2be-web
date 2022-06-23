export type ProgressMessage = {
  type: "progress";
  id: string;
  stage: "unzip" | "convert" | "compaction";
  progress: number;
  total: number;
};

export function isProgressMessage(x: any): x is ProgressMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "progress" &&
    typeof x["id"] === "string" &&
    (x["stage"] === "unzip" ||
      x["stage"] === "convert" ||
      x["stage"] === "compaction") &&
    typeof x["progress"] === "number" &&
    typeof x["total"] === "number"
  );
}

type WorkerErrorType =
  | "NoLevelDatFound"
  | "2OrMoreLevelDatFound"
  | "ConverterFailed"
  | "Unzip"
  | "CopyToIdb"
  | "Other";

export type WorkerError = {
  type: WorkerErrorType;
  native?: Error;
};

export type StartJ2BMessage = {
  type: "j2b";
  id: string;
  file: File;
};

export function isStartJ2BMessage(x: any): x is StartJ2BMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "j2b" &&
    typeof x["id"] === "string" &&
    x["file"] instanceof File
  );
}

export type J2BDoneMessage = {
  type: "j2b_done";
  id: string;
};

export function isJ2BDoneMessage(x: any): x is J2BDoneMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "j2b_done" && typeof x["id"] === "string";
}
