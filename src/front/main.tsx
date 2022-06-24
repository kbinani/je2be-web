import * as React from "react";
import { useEffect, useReducer, useState } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { ServiceWorkerLauncher } from "./service-worker-launcher";
import { ModeSelect } from "./mode-select";
import { J2B } from "./j2b";
import { gettext } from "./i18n";

type Mode = "select" | "j2b" | "b2j" | "x2b" | "x2j";

export const useForceUpdate = () => {
  const [counter, setCounter] = useReducer(
    (prev: number, _: number) => prev + 1,
    0
  );
  return () => setCounter(counter + 1);
};

type MainState = {
  mode: Mode;
  converting: boolean;
};

export const Main: React.FC = () => {
  const [state, setState] = useState<MainState>({
    mode: "select",
    converting: false,
  });
  const onModeSelect = (next: Mode) => {
    setState({ ...state, mode: next });
  };
  const onFinish = () => {
    setState({ ...state, converting: false });
  };
  const onStart = () => {
    setState({ ...state, converting: true });
  };
  const onBeforeUnload = (ev: BeforeUnloadEvent) => {
    if (state.converting) {
      ev.preventDefault();
      ev.returnValue = gettext(
        "Converter still working. Do you really leave the page?"
      );
    }
  };
  useEffect(() => {
    const launcher = new ServiceWorkerLauncher();
    launcher
      .launch()
      .then(() => console.log(`[front] sw launched`))
      .catch(console.error);
    window.addEventListener("beforeunload", onBeforeUnload);
    //TODO: assert window.crossOriginIsolated === true
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);
  return (
    <div className="main">
      <Header disableLink={state.converting} />
      <div className="container">
        {state.mode === "select" && <ModeSelect onSelect={onModeSelect} />}
        {state.mode === "j2b" && <J2B onFinish={onFinish} onStart={onStart} />}
      </div>
      <Footer />
    </div>
  );
};
