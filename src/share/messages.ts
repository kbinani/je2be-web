import { Step } from "./progress";

export type ProgressMessage = {
  type: "progress";
  id: string;
  step: Step;
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
    (x["step"] === "unzip" ||
      x["step"] === "convert" ||
      x["step"] === "compaction" ||
      x["step"] === "copy" ||
      x["step"] === "extract") &&
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
  native: { name?: string; message?: string; stack?: string };
};

export function isWorkerError(x: any): x is WorkerError {
  if (!x) {
    return false;
  }
  return typeof x["type"] === "string" && typeof x["native"] !== "undefined";
}

export type FailedMessage = {
  type: "failed";
  id: string;
  error: WorkerError;
};

export function isFailedMessage(x: any): x is FailedMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "failed" &&
    typeof x["id"] === "string" &&
    isWorkerError(x["error"])
  );
}

export type StartJ2BMessage = {
  type: "j2b";
  id: string;
  file: File | FileList;
};

export function isStartJ2BMessage(x: any): x is StartJ2BMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "j2b" &&
    typeof x["id"] === "string" &&
    (x["file"] instanceof FileList || x["file"] instanceof File)
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
