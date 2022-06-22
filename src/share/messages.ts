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

export type StartPreMessage = {
  type: "pre";
  id: string;
  file: File;
};

export function isStartPreMessage(x: any): x is StartPreMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "pre" &&
    typeof x["id"] === "string" &&
    x["file"] instanceof File
  );
}

export type PostDoneMessage = {
  type: "post_done";
  id: string;
};

export function isPostDoneMessage(x: any): x is PostDoneMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "post_done" && typeof x["id"] === "string";
}
