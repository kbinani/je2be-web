import * as React from "react";
import { ChangeEvent, FC, useState } from "react";

export const MainComponent: FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFiles(ev.target.files);
  };
  const onStart = () => {
    if (!files || files.length !== 1) {
      console.error("no file selected, or one or more files selected");
      return;
    }
  };
  return (
    <div>
      <input type="file" onChange={onChange} />
      <div className="button" onClick={onStart}>
        Start
      </div>
    </div>
  );
};
