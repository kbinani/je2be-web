import React from "react";

export const Link: React.FC<{ url: string }> = ({ url }) => {
  return (
    <a target={"_blank"} href={url}>
      {url}
    </a>
  );
};
