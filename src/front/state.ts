import React from "react";

export type Progress = {
  unzip?: number;
  convert?: number;
  compaction?: number;
};

export type Component = "mode-select";

export type State = {
  progress?: Progress;
  stack: Component[];
};

export const kInitialState: State = { stack: ["mode-select"] };

export const Context = React.createContext<State>(kInitialState);
