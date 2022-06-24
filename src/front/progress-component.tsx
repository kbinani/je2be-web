import * as React from "react";
import { FC } from "react";
import { clamp } from "../share/number";
import {
  ConverterMetadata,
  Rational,
  Step,
  stepDescription,
} from "../share/progress";

export const ProgressComponent: FC<{
  progress: Rational;
  step: Step;
  meta: ConverterMetadata;
}> = ({ progress, step, meta }) => {
  const p = clamp(Math.floor((progress.num / progress.den) * 100), 0, 100);
  const width = progress.num < 0 ? 100 : p;
  const unit = meta.displayUnit(step);
  const label = stepDescription(step);
  return (
    <div className="progress">
      <div
        className="progressBar"
        style={{ width: `${width}%` }}
        data-intermediate={progress.num < 0}
        data-fullwidth={p === 100 || progress.num < 0}
      />
      <div className="progressLabel">
        {unit
          ? `${label}: ${Math.max(0, progress.num)} ${unit}, ${p}% done`
          : `${label}: ${p}% done`}
      </div>
    </div>
  );
};
