import React from "react";
import { gettext } from "./i18n";
import { Component } from "./state";

export const ModeSelect: React.FC<{
  componentSelected: (component: Component) => void;
}> = ({ componentSelected }) => {
  return (
    <div className="vFlex" style={{ alignItems: "center" }}>
      <div style={{ marginBottom: 20 }}>
        {gettext("Select conversion mode:")}
      </div>
      <div
        className="roundButton modeSelectButton"
        onClick={() => componentSelected("j2b-input")}
      >
        {gettext("Java to Bedrock")}
      </div>
      <div
        className="roundButton modeSelectButton"
        onClick={() => componentSelected("b2j-input")}
      >
        {gettext("Bedrock to Java")}
      </div>
      <div
        className="roundButton modeSelectButton"
        onClick={() => componentSelected("x2b-input")}
      >
        {gettext("Xbox360 to Bedrock")}
      </div>
      <div
        className="roundButton modeSelectButton"
        onClick={() => componentSelected("x2j-input")}
      >
        {gettext("Xbox360 to Java")}
      </div>
    </div>
  );
};
