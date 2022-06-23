import React from "react";
import { Context, kInitialState } from "./state";
import { Main } from "./main";

export const App: React.FC = () => {
  return (
    <Context.Provider value={kInitialState}>
      <Main />
    </Context.Provider>
  );
};
