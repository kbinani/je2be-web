import * as React from "react";
import * as ReactDOM from "react-dom";
import Bugsnag from "@bugsnag/js";
import { MainComponent } from "./main";
import BugsnagPluginReact from "@bugsnag/plugin-react";

document.addEventListener("DOMContentLoaded", () => {
  Bugsnag.start({
    apiKey: "0b173cbc2086cd69b797414d4cceafbb",
    plugins: [new BugsnagPluginReact()],
  });
  const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);
  ReactDOM.render(
    <ErrorBoundary>
      <MainComponent />
    </ErrorBoundary>,
    document.getElementById("app")
  );
});
