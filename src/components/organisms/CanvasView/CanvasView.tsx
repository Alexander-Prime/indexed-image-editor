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
  zoom: number;
}

interface OwnProps {}

type Props = StateProps & OwnProps;

class CanvasViewInternal extends React.PureComponent<Props> {
  private ctx: CanvasRenderingContext2D;

  componentDidMount() {
    this.renderPixels();
  }

  render() {
    const { image, zoom } = this.props;
    const elementWidth = image.width * zoom;
    const elementHeight = image.height * zoom;
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
            style={gridStyle(zoom)}
          />
        </div>
      </div>
    );
  }

  private renderPixels() {
    const { image, frame } = this.props;
    const pixels = frame.pixels.reduce((prior: number[], i?: number) => {
      if (i === undefined) {
        prior.push(0, 0, 0, 0);
        return prior;
      }
      prior.push(...image.palette.colors.get(i, [0, 0, 0]), 255);
      return prior;
    }, []);
    const bytes = new Uint8ClampedArray(pixels);
    this.ctx.putImageData(
      new ImageData(bytes, image.width, image.height),
      0,
      0,
    );
  }
}

const gridStyle = (zoomFactor: number) => ({
  opacity: (zoomFactor - 4) / 64,
  backgroundSize: `${zoomFactor}px ${zoomFactor}px`,
});

const mapStateToProps = (state: AppState): StateProps => ({
  image: state.image,
  frame: state.image.strip.frames.first()!,
  zoom: state.zoom,
});

const CanvasView = connect(mapStateToProps)(CanvasViewInternal);

export { CanvasView };
