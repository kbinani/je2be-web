export type StartMessage = {
  file: File;
};

export function isStartMessage(x: any): x is StartMessage {
  if (!x) {
    return false;
  }
  return x["file"] instanceof File;
}

export type SuccessMessage = {};

export function isSuccessMessage(x: any): x is SuccessMessage {
  return !!x;
}

export type FailedMessage = {
  code: Error;
};

export function isFailedMessage(x: any): x is FailedMessage {
  if (!x) {
    return false;
  }
  return x["code"] instanceof Error;
}
