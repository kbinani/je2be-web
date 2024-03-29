import React from "react";
import { gettext } from "../i18n";
import { Mode } from "../mode";

export const ModeSelect: React.FC<{
  onSelect: (mode: Mode) => void;
}> = ({ onSelect }) => {
  return (
    <div className="vFlex" style={{ alignItems: "center", marginTop: 20 }}>
      <div style={{ marginBottom: 20 }}>
        {gettext("Select conversion mode:")}
      </div>
      <div
        className="roundButton modeSelectButton"
        onClick={() => onSelect("j2b")}
      >
        {gettext("Java to Bedrock")}
      </div>
      <div
        className="roundButton modeSelectButton"
        onClick={() => onSelect("b2j")}
      >
        {gettext("Bedrock to Java")}
      </div>
      <div
        className="roundButton modeSelectButton"
        onClick={() => onSelect("x2b")}
      >
        {gettext("Xbox360 to Bedrock")}
      </div>
      <div
        className="roundButton modeSelectButton"
        onClick={() => onSelect("x2j")}
      >
        {gettext("Xbox360 to Java")}
      </div>
      <div
        className="roundButton modeSelectButton"
        onClick={() => onSelect("p2b")}
      >
        {gettext("PS3 to Bedrock")}
      </div>
      <div
        className="roundButton modeSelectButton"
        onClick={() => onSelect("p2j")}
      >
        {gettext("PS3 to Java")}
      </div>
    </div>
  );
};
