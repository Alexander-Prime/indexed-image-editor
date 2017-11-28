import React from "react";

import { Fab } from "components/atoms";

import "./CanvasView.scss";

interface Props {}

const CanvasView = (_: Props) => (
  <div className="canvasView">
    <Fab className="canvasView-gridToggle" />
  </div>
);

export { CanvasView };
