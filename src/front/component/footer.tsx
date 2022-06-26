import * as React from "react";
import { FC } from "react";
import { kAppVersion } from "../../share/version";

const Separator: FC = () => {
  return <div style={{ width: 20 }}>・</div>;
};

export const Footer: FC<{ onClickAbout: () => void }> = ({ onClickAbout }) => {
  return (
    <div className="footer">
      <div className="footerContent">
        <div className="footerRow hFlex">
          <div>
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
          <div>&nbsp;</div>
          <div>je2be-web {kAppVersion === "" ? "(local)" : kAppVersion}</div>
          <Separator />
          <div>Copyright © kbinani</div>
          <Separator />
          <div onClick={onClickAbout} style={{ cursor: "pointer" }}>
            About je2be-web
          </div>
        </div>
        <div className="hFlex">
          <div style={{ margin: 10 }}>
            <a
              target={"_blank"}
              href={"https://apps.apple.com/jp/app/je2be/id1617552608"}
            >
              <img
                height={40}
                alt={"Download je2be on the App Store"}
                src={
                  "image/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
                }
              />
            </a>
          </div>
          <div style={{ margin: 10 }}>
            <a
              target={"_blank"}
              href={"https://www.microsoft.com/store/apps/9PC9MFX9QCXS"}
            >
              <img
                height={39}
                alt={"Get je2be from Microsoft Store"}
                src={"image/English_get it from MS_864X312.svg"}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
