import * as React from "react";
import { FC } from "react";
import { clamp } from "../share/number";

export const Progress: FC<{
  progress: number;
  total: number;
  label: string;
  unit?: string;
}> = ({ progress, total, label, unit }) => {
  const p = clamp(Math.floor((progress / total) * 100), 0, 100);
  const width = progress < 0 ? 100 : p;
  return (
    <div className="progress">
      <div
        className="progressBar"
        style={{ width: `${width}%` }}
        data-intermediate={progress < 0}
        data-fullwidth={p === 100 || progress < 0}
      />
      <div className="progressLabel">
        {unit
          ? `${label}: ${Math.max(0, progress)} ${unit}, ${p}% done`
          : `${label}: ${p}% done`}
      </div>
    </div>
  );
};
