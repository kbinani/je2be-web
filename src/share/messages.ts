import { Step } from "./progress";
import { ConvertMode } from "../front/mode";

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
      x["step"] === "extract" ||
      x["step"] === "postprocess") &&
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

export type StartMessage = {
  type: "start";
  id: string;
  file: File | FileList;
  mode: ConvertMode;
};

export function isStartMessage(x: any): x is StartMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "start" &&
    typeof x["id"] === "string" &&
    (x["file"] instanceof FileList || x["file"] instanceof File) &&
    typeof x["mode"] === "string"
  );
}

export type DoneMessage = {
  type: "done";
  id: string;
};

export function isDoneMessage(x: any): x is DoneMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "done" && typeof x["id"] === "string";
}
