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
};

export function isSuccessMessage(x: any): x is SuccessMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "success" && typeof x["id"] === "string";
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
  stage: "unzip" | "convert" | "compaction" | "zip" | "copy";
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
      x["stage"] === "zip" ||
      x["stage"] === "copy") &&
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

export type PocStartPreMessage = {
  type: "pre";
  id: string;
  file: File;
};

export function isPocStartPreMessage(x: any): x is PocStartPreMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "pre" &&
    typeof x["id"] === "string" &&
    x["file"] instanceof File
  );
}

export type PocConvertRegionMessage = {
  type: "region";
  id: string;
  rx: number;
  rz: number;
  dim: number;
  javaEditionMap: number[];
};

export function isPocConvertRegionMessage(
  x: any
): x is PocConvertRegionMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "region" &&
    typeof x["id"] === "string" &&
    typeof x["rx"] === "number" &&
    typeof x["rz"] === "number" &&
    typeof x["dim"] === "number" &&
    !!x["javaEditionMap"]
  );
}

export type PocConvertQueueingFinishedMessage = {
  id: string;
  type: "queueing_finished";
};

export function isPocConvertQueueingFinishedMessage(
  x: any
): x is PocConvertQueueingFinishedMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "queueing_finished" && typeof x["id"] === "string";
}

export type PocStartPostMessage = {
  type: "post";
  id: string;
};

export function isPocStartPostMessage(x: any): x is PocStartPostMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "post" && typeof x["id"] === "string";
}

export type PocPostDoneMessage = {
  type: "post_done";
  id: string;
};

export function isPocPostDoneMessage(x: any): x is PocPostDoneMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "post_done" && typeof x["id"] === "string";
}

export type PocConvertRegionDoneMessage = {
  type: "region_done";
  id: string;
  data: string;
};

export function isPocConvertRegionDoneMessage(
  x: any
): x is PocConvertRegionDoneMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "region_done" &&
    typeof x["id"] === "string" &&
    typeof x["data"] === "string"
  );
}

export type ExportDoneMessage = {
  type: "export_done";
  id: string;
  numTotalChunks: number;
};

export function isExportDoneMessage(x: any): x is ExportDoneMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "export_done" &&
    typeof x["id"] === "string" &&
    typeof x["numTotalChunks"] === "number"
  );
}
