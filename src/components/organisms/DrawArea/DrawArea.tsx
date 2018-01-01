import classNames from "classnames";
import React from "react";

import { Fab, Icon } from "components/atoms";
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
    <Fab className="drawArea-gridToggle">
      <Icon className="drawArea-gridToggle-icon" name="grid_on" />
    </Fab>
  </div>
);

export { DrawArea };
