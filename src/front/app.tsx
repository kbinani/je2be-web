import React from "react";
import { kInitialState, State } from "./state";

const AppContext = React.createContext<State>(kInitialState);

export const App: React.FC = () => {
  return <AppContext.Provider value={kInitialState}></AppContext.Provider>;
};
