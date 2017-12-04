import React from "react";
import { connect } from "react-redux";

import { Fab, Icon } from "components/atoms";

import { AppState } from "data/AppState";
import { Frame } from "data/Frame";
import { Image } from "data/Image";

import "./CanvasView.scss";

interface StateProps {
  image: Image;
  frame: Frame;
}

interface OwnProps {}

type Props = StateProps & OwnProps;

class CanvasViewInternal extends React.PureComponent<Props> {
  private ctx: CanvasRenderingContext2D;

  componentDidMount() {
    this.renderPixels();
  }

  render() {
    const { image } = this.props;
    const zoomFactor = 32;
    const elementWidth = image.width * zoomFactor;
    const elementHeight = image.height * zoomFactor;
    return (
      <div className="canvasView">
        <Fab className="canvasView-gridToggle">
          <Icon className="canvasView-gridToggle-icon" name="grid_on" />
        </Fab>
        <div className="canvasView-frame">
          <canvas
            className="canvasView-frame-canvas"
            onClick={console.log}
            width={image.width}
            height={image.height}
            style={{ width: elementWidth, height: elementHeight }}
            ref={canvas => (this.ctx = canvas!.getContext("2d")!)}
          />
          <div
            className="canvasView-frame-gridOverlay"
            style={gridStyle(zoomFactor)}
          />
        </div>
      </div>
    );
  }

  private renderPixels() {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(4, 4, 24, 24);
    this.ctx.clearRect(5, 5, 22, 22);
  }
}

const gridStyle = (zoomFactor: number) => ({
  opacity: (zoomFactor - 4) / 64,
  backgroundSize: `${zoomFactor}px ${zoomFactor}px`,
});

const mapStateToProps = (state: AppState): StateProps => ({
  image: state.image,
  frame: state.image.strip.frames.first()!,
});

const CanvasView = connect(mapStateToProps)(CanvasViewInternal);

export { CanvasView };
