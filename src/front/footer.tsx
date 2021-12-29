import * as React from "react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="footer">
      <div className="footerContent">
        <div className={"footerRow"}>
          <a href={"https://github.com/kbinani/je2be-web"}>
            <img
              width={20}
              height={20}
              src={"image/GitHub-Mark-Light-64px.png"}
            />
          </a>
        </div>
        <div className="footerRow">Copyright © kbinani</div>
      </div>
    </div>
  );
};
