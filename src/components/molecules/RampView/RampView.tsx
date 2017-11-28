import classNames from "classnames";
import React from "react";

import "./RampView.scss";

interface Props {
  className?: string;
  name: string;
}

const RampView = (props: Props) => (
  <div className={classNames("ramp", classNames(props.className))}>
    <div className="ramp-name">{props.name}</div>
    <div className="ramp-swatches">Swatches go here</div>
  </div>
);

export { RampView };
