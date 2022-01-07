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
  file: File;
  levelDirectory: string;
  numWorkers: number;
};

export function isStartPostMessage(x: any): x is StartPostMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "post" &&
    typeof x["id"] === "string" &&
    x["file"] instanceof File &&
    typeof x["levelDirectory"] === "string" &&
    typeof x["numWorkers"] === "number"
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

export type ConvertRegionDoneMessage = {
  type: "region_done";
  id: string;
  data: string;
};

export function isConvertRegionDoneMessage(
  x: any
): x is ConvertRegionDoneMessage {
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
  levelDirectory: string;
};

export function isExportDoneMessage(x: any): x is ExportDoneMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "export_done" &&
    typeof x["id"] === "string" &&
    typeof x["numTotalChunks"] === "number" &&
    typeof x["levelDirectory"] === "string"
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

export type DbKey = {
  key: Uint8Array;
  file: string;
  pos: number;
};

export type CompactionQueueMessage = {
  type: "compaction_queue";
  index: number;
  id: string;
  keys: DbKey[];
};

export function isCompactionQueueMessage(x: any): x is CompactionQueueMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "compaction_queue" &&
    typeof x["index"] === "number" &&
    typeof x["id"] === "string" &&
    !!x["keys"]
  );
}

export type CompactionThreadFinishedMessage = {
  type: "compaction_thread_finished";
  index: number;
  id: string;
};

export function isCompactionThreadFinishedMessage(
  x: any
): x is CompactionThreadFinishedMessage {
  if (!x) {
    return false;
  }
  return (
    x["type"] === "compaction_thread_finished" &&
    typeof x["index"] === "number" &&
    typeof x["id"] === "string"
  );
}
