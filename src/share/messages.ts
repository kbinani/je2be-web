export type StartMessage = {
  files: FileList;
};

export function isStartMessage(x: any): x is StartMessage {
  if (!x) {
    return false;
  }
  return x["files"] instanceof FileList;
}

export type FinishMessage = {};

export function isFinishMessage(x: any): x is FinishMessage {
  return true;
}
