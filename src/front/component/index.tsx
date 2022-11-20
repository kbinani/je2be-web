import * as React from "react";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import { kAppVersion } from "../../share/version";
import { App } from "./app";
import { createRoot } from "react-dom/client";

document.addEventListener("DOMContentLoaded", () => {
  const appVersion = kAppVersion === "" ? "0.0.0" : kAppVersion;
  Bugsnag.start({
    apiKey: "0b173cbc2086cd69b797414d4cceafbb",
    plugins: [new BugsnagPluginReact()],
    appVersion,
  });
  const ErrorBoundary = Bugsnag.getPlugin("react")!.createErrorBoundary(React);
  const container = document.getElementById("app");
  const root = createRoot(container!);
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
});
