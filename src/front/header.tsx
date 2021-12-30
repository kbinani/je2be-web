import * as React from "react";
import { FC } from "react";

export const Header: FC<{ disableLink: boolean }> = ({ disableLink }) => {
  return (
    <div className="header">
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
    return <>children</>;
  } else {
    return <a href={url}>{children}</a>;
  }
};
