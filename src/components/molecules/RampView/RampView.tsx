import classNames from "classnames";
import React from "react";

import { Palette } from "data/Palette";
import { Ramp } from "data/Ramp";

import "./RampView.scss";

interface Props {
  className?: string;
  palette: Palette;
  index: number;
  ramp: Ramp;
}

const RampView = (props: Props) => (
  <div className={classNames("ramp", classNames(props.className))}>
    <div className="ramp-name">{props.ramp.name}</div>
    <div className="ramp-swatches">Swatches go here</div>
  </div>
);

export { RampView };
