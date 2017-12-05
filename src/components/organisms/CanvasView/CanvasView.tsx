import { List, Repeat } from "immutable";
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
  paletteIndex: number;
}

interface OwnProps {}

type Props = StateProps & OwnProps;

interface State {
  drawMask: List<boolean>;
  drawMode: "draw" | "erase";
}

class CanvasViewInternal extends React.PureComponent<Props, State> {
  private ctx: CanvasRenderingContext2D;

  constructor(props: Props) {
    super(props);
    const { image } = props;
    this.state = {
      drawMask: this.createMask(image),
      drawMode: "draw",
    };
  }

  componentDidMount() {
    this.renderPixels();
  }

  componentDidUpdate() {
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
            width={image.width}
            height={image.height}
            style={{ width: elementWidth, height: elementHeight }}
            ref={canvas => {
              if (canvas) {
                this.ctx = canvas!.getContext("2d")!;
              }
            }}
            onContextMenu={this.onContextMenu}
            onMouseDown={this.onDraw}
            onMouseMove={this.onDraw}
            onMouseUp={this.onFinishDraw}
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
    const { image, frame, paletteIndex } = this.props;
    const bytes = new Uint8ClampedArray(
      frame.pixels.reduce(
        (prior: number[], c: number | undefined, i: number) => {
          const { drawMask, drawMode } = this.state;
          if (drawMask.get(i)) {
            if (drawMode === "draw") {
              prior.push(
                ...image.palette.colors.get(paletteIndex, [0, 0, 0]),
                255,
              );
            } else {
              prior.push(0, 0, 0, 0);
            }
          } else {
            if (c === undefined) {
              prior.push(0, 0, 0, 0);
            } else {
              prior.push(...image.palette.colors.get(c, [0, 0, 0]), 255);
            }
          }
          return prior;
        },
        [],
      ),
    );
    this.ctx.putImageData(
      new ImageData(bytes, image.width, image.height),
      0,
      0,
    );
  }

  private onContextMenu = (ev: React.MouseEvent<HTMLCanvasElement>) => {
    ev.preventDefault();
    return false;
  };

  private onDraw = (ev: React.MouseEvent<HTMLCanvasElement>) => {
    if (ev.buttons === 1 || ev.buttons === 2) {
      this.maskPixels([
        Math.floor(ev.nativeEvent.offsetX / 32),
        Math.floor(ev.nativeEvent.offsetY / 32),
      ]);
    }
    if (ev.buttons === 1 /* LMB */) {
      this.setState({ drawMode: "draw" });
    }
    if (ev.buttons === 2 /* RMB */) {
      this.setState({ drawMode: "erase" });
    }
  };

  private onFinishDraw = (_: React.MouseEvent<HTMLCanvasElement>) => {
    this.setState({
      drawMask: this.createMask(this.props.image),
    });
  };

  private createMask(image: Image) {
    return Repeat(false, image.width * image.height).toList();
  }

  private maskPixels(...coords: Array<[number, number]>) {
    const { image } = this.props;
    this.setState({
      drawMask: this.state.drawMask.withMutations(mask => {
        coords.forEach(coord =>
          mask.set(coord[0] + coord[1] * image.width, true),
        );
      }),
    });
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
  paletteIndex: 0,
});

const CanvasView = connect(mapStateToProps)(CanvasViewInternal);

export { CanvasView };
