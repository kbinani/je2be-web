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
};

export function isSuccessMessage(x: any): x is SuccessMessage {
  if (!x) {
    return false;
  }
  return typeof x["id"] === "string";
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

type WorkerErrorType = "NoLevelDatFound" | "Other";

export class WorkerError extends Error {
  constructor(readonly type: WorkerErrorType, readonly native?: Error) {
    super();
  }
}
