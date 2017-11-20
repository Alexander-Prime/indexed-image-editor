import React from "react";

import { Fab } from "components/atoms";

import "./CanvasView.scss";

interface Props {}

const CanvasView = (_: Props) => {
  return (
    <div className="canvasView">
      <Fab />
    </div>
  );
};

export { CanvasView };
