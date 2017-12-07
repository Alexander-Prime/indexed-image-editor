import classNames from "classnames";
import React from "react";

import { Palette } from "data/Palette";
import { Ramp } from "data/Ramp";

import "./RampHeading.scss";

interface Props {
  className?: string;
  palette: Palette;
  index: number;
  ramp: Ramp;
}

const RampHeading = (props: Props) => (
  <div className={classNames("rampHeading", classNames(props.className))}>
    <div className="rampHeading-name">{props.ramp.name}</div>
  </div>
);

export { RampHeading };
