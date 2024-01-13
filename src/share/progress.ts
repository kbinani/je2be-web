import { ProgressMessage } from "./messages";

export type ProgressPair = { progress: number; count: number };

export type Progress = {
  unzip?: ProgressPair;
  copy?: ProgressPair;
  convert?: ProgressPair;
  compaction?: ProgressPair;
  extract?: ProgressPair;
  postprocess?: ProgressPair;
};

export type ProgressReducer = (progress: Progress) => Progress;

export type Step =
  | "unzip"
  | "copy"
  | "convert"
  | "compaction"
  | "extract"
  | "postprocess";

export interface ConverterMetadata {
  steps: Step[];

  displayUnit(step: Step): string | undefined;

  stepDescription(step: Step): string | undefined;
}

export class J2BConverterMetadata implements ConverterMetadata {
  constructor(readonly file: boolean) {}

  get steps(): Step[] {
    if (this.file) {
      return ["unzip", "convert", "postprocess", "compaction"];
    } else {
      return ["copy", "convert", "postprocess", "compaction"];
    }
  }

  displayUnit(step: Step): string | undefined {
    switch (step) {
      case "unzip":
      case "copy":
        return "files";
      case "convert":
        return "chunks";
      case "postprocess":
        return undefined;
      case "compaction":
        return undefined;
    }
  }

  stepDescription(step: Step): string | undefined {
    switch (step) {
      case "unzip":
        return "Unzip";
      case "copy":
        return "Copy";
      case "convert":
        return "Convert";
      case "postprocess":
        return "Post Process";
      case "compaction":
        return "LevelDB Compaction";
    }
  }
}

export class B2JConverterMetadata implements ConverterMetadata {
  constructor(readonly file: boolean) {}

  get steps(): Step[] {
    if (this.file) {
      return ["unzip", "convert", "postprocess"];
    } else {
      return ["copy", "convert", "postprocess"];
    }
  }

  displayUnit(step: Step): string | undefined {
    switch (step) {
      case "unzip":
      case "copy":
        return "files";
      case "convert":
        return "chunks";
      case "postprocess":
        return "chunks";
    }
  }

  stepDescription(step: Step): string | undefined {
    switch (step) {
      case "unzip":
        return "Unzip";
      case "copy":
        return "Copy";
      case "convert":
        return "Convert";
      case "postprocess":
        return "Post process";
    }
  }
}

export class X2JConverterMetadata implements ConverterMetadata {
  get steps(): Step[] {
    return ["extract"];
  }

  displayUnit(step: Step): string | undefined {
    return undefined;
  }

  stepDescription(step: Step): string | undefined {
    switch (step) {
      case "extract":
        return "Convert";
    }
  }
}

export class X2BConverterMetadata implements ConverterMetadata {
  get steps(): Step[] {
    return ["extract", "convert", "postprocess", "compaction"];
  }

  displayUnit(step: Step): string | undefined {
    switch (step) {
      case "extract":
        return undefined;
      case "convert":
        return "chunks";
      case "postprocess":
        return undefined;
      case "compaction":
        return undefined;
    }
  }

  stepDescription(step: Step): string | undefined {
    switch (step) {
      case "extract":
        return "Extract";
      case "convert":
        return "Convert";
      case "postprocess":
        return "Post Process";
      case "compaction":
        return "LevelDB Compaction";
    }
  }
}

export class P2JConverterMetadata implements ConverterMetadata {
  constructor(readonly file: boolean) {}

  get steps(): Step[] {
    if (this.file) {
      return ["unzip", "extract"];
    } else {
      return ["copy", "extract"];
    }
  }

  displayUnit(step: Step): string | undefined {
    switch (step) {
      case "copy":
      case "unzip":
        return "files";
      case "extract":
        return undefined;
    }
  }

  stepDescription(step: Step): string | undefined {
    switch (step) {
      case "copy":
        return "Copy";
      case "unzip":
        return "Unzip";
      case "extract":
        return "Convert";
    }
  }
}

export class P2BConverterMetadata implements ConverterMetadata {
  constructor(readonly file: boolean) {}

  get steps(): Step[] {
    if (this.file) {
      return ["unzip", "extract", "convert", "postprocess", "compaction"];
    } else {
      return ["copy", "extract", "convert", "postprocess", "compaction"];
    }
  }

  displayUnit(step: Step): string | undefined {
    switch (step) {
      case "copy":
      case "unzip":
        return "files";
      case "extract":
        return undefined;
      case "convert":
        return "chunks";
      case "postprocess":
        return undefined;
      case "compaction":
        return undefined;
    }
  }

  stepDescription(step: Step): string | undefined {
    switch (step) {
      case "copy":
        return "Copy";
      case "unzip":
        return "Unzip";
      case "extract":
        return "Extract";
      case "convert":
        return "Convert";
      case "postprocess":
        return "Post Process";
      case "compaction":
        return "LevelDB Compaction";
    }
  }
}

export function nextProgress(
  progress: Progress,
  m: ProgressMessage,
  meta: ConverterMetadata,
): Progress {
  const steps = meta.steps;
  const index = steps.indexOf(m.step);
  if (index < 0) {
    console.error(`index out of range: index=${index}; m.step=${m.step}`);
  }
  const ret: Progress = {};
  for (let i = 0; i < index; i++) {
    const step = steps[i];
    ret[step] = progress[step];
  }
  ret[m.step] = {
    progress: m.progress === 0 ? -1 : m.progress,
    count: m.count,
  };
  for (let i = index + 1; i < steps.length; i++) {
    const step = steps[i];
    if (i === index + 1 && m.progress >= 1) {
      ret[step] = { progress: -1, count: 0 };
    } else {
      ret[step] = { progress: 0, count: 0 };
    }
  }
  return ret;
}

export function initialProgress(meta: ConverterMetadata): Progress {
  const ret: Progress = {};
  const steps = meta.steps;
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    if (i === 0) {
      ret[step] = { progress: -1, count: 0 };
    } else {
      ret[step] = { progress: 0, count: 0 };
    }
  }
  return ret;
}
