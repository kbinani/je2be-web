export type StartMessage = {
  id: string;
  file: File;
};

export function isStartMessage(x: any): x is StartMessage {
  if (!x) {
    return false;
  }
  return typeof x["id"] === "string" && x["file"] instanceof File;
}

export type SuccessMessage = {
  id: string;
  url: string;
};

export function isSuccessMessage(x: any): x is SuccessMessage {
  if (!x) {
    return false;
  }
  return typeof x["id"] === "string" && typeof x["url"] === "string";
}

export type FailedMessage = {
  id: string;
  error: WorkerError;
};

export function isFailedMessage(x: any): x is FailedMessage {
  if (!x) {
    return false;
  }
  return (
    typeof x["id"] === "string" &&
    !x["error"] &&
    typeof x["error"]["type"] === "string"
  );
}

export type ProgressMessage = {
  id: string;
  stage: "unzip" | "convert" | "compaction";
  progress: number;
};

export function isProgressMessage(x: any): x is ProgressMessage {
  if (!x) {
    return false;
  }
  return (
    typeof x["id"] === "string" &&
    (x["stage"] === "unzip" ||
      x["stage"] === "convert" ||
      x["stage"] === "compaction") &&
    typeof x["progress"] === "number"
  );
}

type WorkerErrorType = "NoLevelDatFound" | "ConverterFailed" | "Other";

export class WorkerError extends Error {
  constructor(readonly type: WorkerErrorType, readonly native?: Error) {
    super();
  }
}
