import * as React from "react";
import { FC } from "react";
import { clamp } from "../../share/number";
import { ConverterMetadata, ProgressPair, Step } from "../../share/progress";
import { sprintf } from "sprintf-js";

export const Progress: FC<{
  value: ProgressPair;
  step: Step;
  meta: ConverterMetadata;
}> = ({ value, step, meta }) => {
  const { progress, count } = value;
  const p = clamp(progress * 100, 0, 100);
  const width = progress < 0 ? 100 : p;
  const unit = meta.displayUnit(step);
  const label = meta.stepDescription(step);
  let msg: string;
  if (unit) {
    msg = `${Math.max(0, count)} ${unit}, ${sprintf("%.1f", p)}% done`;
  } else {
    msg = `${sprintf("%.1f", p)}% done`;
  }
  return (
    <div className="progress">
      <div
        className="progressBar"
        style={{ width: `${width}%` }}
        data-intermediate={progress < 0}
        data-fullwidth={p === 100 || progress < 0}
      />
      <div className="progressLabel">
        {progress === 0 ? label : `${label}: ${msg}`}
      </div>
    </div>
  );
};
