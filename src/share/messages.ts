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

export type ConvertRegionMessage = {
  type: "region";
  id: string;
  rx: number;
  rz: number;
  dim: number;
  javaEditionMap: number[];
};

export function isConvertRegionMessage(x: any): x is ConvertRegionMessage {
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

export type ConvertQueueingFinishedMessage = {
  id: string;
  type: "queueing_finished";
};

export function isConvertQueueingFinishedMessage(
  x: any
): x is ConvertQueueingFinishedMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "queueing_finished" && typeof x["id"] === "string";
}

export type StartPostMessage = {
  type: "post";
  id: string;
};

export function isStartPostMessage(x: any): x is StartPostMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "post" && typeof x["id"] === "string";
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

export type ConvertRegionDoneMessage = {
  type: "region_done";
  id: string;
};

export function isConvertRegionDoneMessage(
  x: any
): x is ConvertRegionDoneMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "region_done" && typeof x["id"] === "string";
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

export type ConvertProgressDeltaMessage = {
  type: "convert_progress_delta";
  id: string;
  delta: number;
};

export function isConvertProgressDeltaMessage(
  x: any
): x is ConvertProgressDeltaMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "convert_progress_delta" &&
    typeof x["id"] === "string" &&
    typeof x["delta"] === "number"
  );
}

export type ResultFilesMessage = {
  type: "result_message";
  id: string;
  files: string[][];
};

export function isResultFilesMessage(x: any): x is ResultFilesMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "result_message" &&
    typeof x["id"] === "string" &&
    !!x["files"]
  );
}

export type ForgetResultFilesMessage = {
  type: "forget_result_files";
  id: string;
};

export function isForgetResultFilesMessage(
  x: any
): x is ForgetResultFilesMessage {
  if (!x) {
    return false;
  }
  return x["type"] === "forget_result_files" && typeof x["id"] === "string";
}

export type DbPutMessage = {
  type: "db_put";
  id: string;
  key: Uint8Array;
  value: Uint8Array;
};

export function isDbPutMessage(x: any): x is DbPutMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "db_put" &&
    typeof x["id"] === "string" &&
    !!x["key"] &&
    !!x["value"]
  );
}
