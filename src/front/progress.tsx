import * as React from "react";
import { FC } from "react";

export const Progress: FC<{
  progress: number;
  total: number;
  label: string;
  unit?: string;
}> = ({ progress, total, label, unit }) => {
  const p = Math.floor((progress / total) * 100);
  return (
    <div className="progress">
      <div
        className="progressBar"
        style={{ width: `${p < 0 ? 100 : p}%` }}
        data-intermediate={p < 0}
        data-completed={p === 100 || p < 0}
      />
      <div className="progressLabel">
        {unit
          ? `${label}: ${progress} ${unit}, ${p}% done`
          : `${label}: ${p}% done`}
      </div>
    </div>
  );
};
