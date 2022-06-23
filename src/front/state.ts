export interface Progress {
  unzip?: number;
  convert?: { num: number; den: number };
  compaction?: number;
}

export type ProgressReducer = (progress: Progress) => Progress;

export type Mode = "select" | "j2b" | "b2j" | "x2b" | "x2j";
