import * as React from "react";
import { FC } from "react";
import { kAppVersion } from "../../share/version";

export const Footer: FC<{ onClickAbout: () => void }> = ({ onClickAbout }) => {
  return (
    <div className="footer">
      <div className="footerContent">
        <div className={"footerRow"}>
          <a
            href={"https://github.com/kbinani/je2be-web"}
            target={"je2be.app/github-link"}
          >
            <img
              width={20}
              height={20}
              src={"image/GitHub-Mark-Light-64px.png"}
            />
          </a>
        </div>
        <div className="footerRow">
          je2be-web {kAppVersion === "" ? "(local)" : kAppVersion}
        </div>
        <div className="footerRow hFlex">
          <div>Copyright © kbinani</div>・
          <div onClick={onClickAbout} style={{ cursor: "pointer" }}>
            About je2be-web
          </div>
        </div>
      </div>
    </div>
  );
};
