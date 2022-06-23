export type Progress = {
  unzip?: number;
  convert?: number;
  compaction?: number;
};

export type Component =
  | "mode-select"
  | "j2b-input"
  | "b2j-input"
  | "x2b-input"
  | "x2j-input";

export type State = {
  progress?: Progress;
  stack: Component[];
};

export const kInitialState: State = { stack: ["mode-select"] };
