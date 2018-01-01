import classNames from "classnames";
import React from "react";

import { CanvasView } from "components/molecules";

import "./DrawArea.scss";

interface Props {
  className?: string;
}

const DrawArea = (props: Props) => (
  <div className={classNames("drawArea", props.className)}>
    <div className="drawArea-scrollWindow">
      <CanvasView className="drawArea-scrollWindow-canvas" />
    </div>
  </div>
);

export { DrawArea };
