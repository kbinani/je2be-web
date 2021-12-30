import * as React from "react";
import { FC } from "react";
export const Header: FC = () => {
  return (
    <div className="header">
      <a href={"./"}>
        <div className="appLabel">je2be-web</div>
      </a>
      <div className="appLabelSub">A data converter for Minecraft</div>
    </div>
  );
};
