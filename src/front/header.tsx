import * as React from "react";
import { FC } from "react";

export const Header: FC<{ disableLink: boolean; onClick: () => void }> = ({
  disableLink,
  onClick,
}) => {
  return (
    <div className="header" onClick={onClick}>
      <Link url={"./"} disable={disableLink}>
        <div className="appLabel">je2be-web</div>
      </Link>
      <div className="appLabelSub">A data converter for Minecraft</div>
    </div>
  );
};

const Link: FC<{ url: string; disable: boolean }> = ({
  children,
  url,
  disable,
}) => {
  if (disable) {
    return <>{children}</>;
  } else {
    return <a href={url}>{children}</a>;
  }
};
