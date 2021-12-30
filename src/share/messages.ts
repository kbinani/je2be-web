export type StartMessage = {
  type: "start";
  id: string;
  file: File;
};

export function isStartMessage(x: any): x is StartMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "start" &&
    typeof x["id"] === "string" &&
    x["file"] instanceof File
  );
}

export type SuccessMessage = {
  type: "success";
  id: string;
  url: string;
};

export function isSuccessMessage(x: any): x is SuccessMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "success" &&
    typeof x["id"] === "string" &&
    typeof x["url"] === "string"
  );
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
    typeof x["error"] !== "undefined"
  );
}

export type ProgressMessage = {
  type: "progress";
  id: string;
  stage: "unzip" | "convert" | "compaction" | "zip";
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
      x["stage"] === "compaction" ||
      x["stage"] === "zip") &&
    typeof x["progress"] === "number" &&
    typeof x["total"] === "number"
  );
}

type WorkerErrorType =
  | "NoLevelDatFound"
  | "2OrMoreLevelDatFound"
  | "ConverterFailed"
  | "Unzip"
  | "Other";

export type WorkerError = {
  type: WorkerErrorType;
  native?: Error;
};
