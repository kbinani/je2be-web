import * as React from "react";
import { useEffect, useReducer, useState } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { ServiceWorkerLauncher } from "../service-worker-launcher";
import { ModeSelect } from "./mode-select";
import { gettext } from "../i18n";
import { Mode } from "../mode";
import { Convert } from "./convert";
import { About } from "./about";

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
  about: boolean;
};

function isSharedArrayBufferSupported() {
  if (typeof crossOriginIsolated !== "boolean") {
    return false;
  }
  if (typeof SharedArrayBuffer === "undefined") {
    return false;
  }
  return crossOriginIsolated === true;
}

function isSupportedBrowser() {
  if (typeof navigator.hardwareConcurrency === "undefined") {
    return false;
  }
  if (typeof Worker === "undefined") {
    return false;
  }
  return isSharedArrayBufferSupported();
}

export const Main: React.FC = () => {
  const [state, setState] = useState<MainState>({
    mode: "select",
    converting: false,
    about: false,
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
  const onBackConvert = () => {
    setState({ converting: false, mode: "select", about: false });
  };
  const onClickAbout = () => {
    setState({ ...state, about: true });
  };
  const onBackAbout = () => {
    setState({ ...state, about: false });
  };
  useEffect(() => {
    const launcher = new ServiceWorkerLauncher();
    launcher
      .launch()
      .then(() => console.log(`[front] sw launched`))
      .catch(console.error);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);
  const supported = isSupportedBrowser();
  return (
    <div className="main">
      <div className="container">
        {state.mode === "select" && <ModeSelect onSelect={onModeSelect} />}
        {state.mode !== "select" && (
          <Convert
            mode={state.mode}
            onFinish={onFinish}
            onStart={onStart}
            onBack={onBackConvert}
          />
        )}
        {!supported && <UnsupportedBrowserMessage />}
      </div>
      <Header />
      <Footer onClickAbout={onClickAbout} />
      {state.about && <About onBack={onBackAbout} />}
    </div>
  );
};

const UnsupportedBrowserMessage: React.FC = () => {
  return (
    <div className="unsupportedMessageContainer">
      <div className="unsupportedMessage vFlex">
        <div>{gettext("Unsupported browser because:")}</div>
        <ul>
          {typeof navigator.hardwareConcurrency === "undefined" && (
            <li>
              {gettext(
                "This browser doesn't have navigator.hardwareConcurrency property"
              ) + ": "}
              <a
                target={"_blank"}
                href={
                  "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency"
                }
              >
                https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency
              </a>
            </li>
          )}
          {typeof Worker === "undefined" && (
            <li>
              {gettext("This browser doesn't have Worker class") + ": "}
              <a
                target={"_blank"}
                href={
                  "https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker"
                }
              >
                https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker
              </a>
            </li>
          )}
          {!isSharedArrayBufferSupported() && (
            <li>
              {gettext("This browser doesn't support SharedArrayBuffer") + ": "}
              <a
                target={"_blank"}
                href={
                  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer"
                }
              >
                https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
