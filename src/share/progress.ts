import { ProgressMessage } from "./messages";

export type Rational = { num: number; den: number };

export type Progress = {
  unzip?: Rational;
  copy?: Rational;
  convert?: Rational;
  compaction?: Rational;
  extract?: Rational;
};

export type ProgressReducer = (progress: Progress) => Progress;

export type Step = "unzip" | "copy" | "convert" | "compaction" | "extract";

export interface ConverterMetadata {
  steps: Step[];

  displayUnit(step: Step): string | undefined;

  stepDescription(step: Step): string | undefined;
}

export class J2BConverterMetadata implements ConverterMetadata {
  constructor(readonly file: boolean) {}

  get steps(): Step[] {
    if (this.file) {
      return ["unzip", "convert", "compaction"];
    } else {
      return ["copy", "convert", "compaction"];
    }
  }

  displayUnit(step: Step): string | undefined {
    switch (step) {
      case "unzip":
      case "copy":
        return "files";
      case "convert":
        return "chunks";
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
      case "compaction":
        return "LevelDB Compaction";
    }
  }
}

export class B2JConverterMetadata implements ConverterMetadata {
  constructor(readonly file: boolean) {}

  get steps(): Step[] {
    if (this.file) {
      return ["unzip", "convert"];
    } else {
      return ["copy", "convert"];
    }
  }

  displayUnit(step: Step): string | undefined {
    switch (step) {
      case "unzip":
      case "copy":
        return "files";
      case "convert":
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
    return ["extract", "convert", "compaction"];
  }

  displayUnit(step: Step): string | undefined {
    switch (step) {
      case "extract":
        return undefined;
      case "convert":
        return "chunks";
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
      case "compaction":
        return "LevelDB Compaction";
    }
  }
}

export function nextProgress(
  progress: Progress,
  m: ProgressMessage,
  meta: ConverterMetadata
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
  ret[m.step] = { num: m.progress === 0 ? -1 : m.progress, den: m.total };
  for (let i = index + 1; i < steps.length; i++) {
    const step = steps[i];
    if (i === index + 1 && m.progress === m.total) {
      ret[step] = { num: -1, den: 1 };
    } else {
      ret[step] = { num: 0, den: 1 };
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
      ret[step] = { num: -1, den: 1 };
    } else {
      ret[step] = { num: 0, den: 1 };
    }
  }
  return ret;
}
