import React from "react";

import { Fab, Icon } from "components/atoms";

import "./CanvasView.scss";

interface Props {}

const CanvasView = (_: Props) => {
  const zoomFactor = 32;
  return (
    <div className="canvasView">
      <Fab className="canvasView-gridToggle">
        <Icon className="canvasView-gridToggle-icon" name="grid_on" />
      </Fab>
      <div className="canvasView-gridOverlay" style={gridStyle(zoomFactor)} />
    </div>
  );
};

const gridStyle = (zoomFactor: number) => ({
  opacity: (zoomFactor - 4) / 64,
  backgroundSize: `${zoomFactor}px ${zoomFactor}px`,
});

export { CanvasView };
