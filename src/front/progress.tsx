import * as React from "react";
import { FC } from "react";

export const Progress: FC<{ progress: number; label: string }> = ({
  progress,
  label,
}) => {
  const p = Math.floor(progress * 100);
  return (
    <div className="progress">
      <div
        className="progressBar"
        style={{ width: `${p}%` }}
        data-completed={p === 100}
      />
      <div className="progressLabel">
        {label}: {p}% done
      </div>
    </div>
  );
};
