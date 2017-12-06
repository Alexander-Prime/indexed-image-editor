import { List, Repeat, Set } from "immutable";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Rgb } from "common/types";

import { Fab, Icon } from "components/atoms";

import { AppState } from "data/AppState";
import { draw, erase, Image } from "data/Image";

import "./CanvasView.scss";

interface StateProps {
  image: Image;
  frame: List<number | undefined>;
  zoom: number;
  paletteIndex: number;
}

interface OwnProps {}

interface Props extends StateProps, OwnProps {
  draw: (drawMask: Set<number>) => void;
  erase: (eraseMask: Set<number>) => void;
}

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
      <div className="canvasView" onContextMenu={this.onContextMenu}>
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
            onMouseDown={this.onDraw}
            onMouseMove={this.onDraw}
            onMouseUp={this.onFinishDraw}
            onMouseLeave={this.onFinishDraw}
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
      frame.reduce((prior: number[], c: number | undefined, i: number) => {
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
      }, []),
    );
    this.ctx.putImageData(
      new ImageData(bytes, image.width, image.height),
      0,
      0,
    );
  }

  private onContextMenu = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    return false;
  };

  private onDraw = (ev: React.MouseEvent<HTMLElement>) => {
    if (ev.buttons === 1 || ev.buttons === 2) {
      const rect = ev.currentTarget.getBoundingClientRect();
      const { zoom, image } = this.props;
      const { width, height } = image;
      const imageCoords: [number, number] = [
        Math.floor(clamp(0, (ev.clientX - rect.left) / zoom, width)),
        Math.floor(clamp(0, (ev.clientY - rect.top) / zoom, height)),
      ];
      this.maskPixels(imageCoords);
    }
    if (ev.buttons === 1 /* LMB */) {
      this.setState({ drawMode: "draw" });
    }
    if (ev.buttons === 2 /* RMB */) {
      this.setState({ drawMode: "erase" });
    }
  };

  private onFinishDraw = (_: React.MouseEvent<HTMLElement>) => {
    const mask = this.state.drawMask
      .entrySeq()
      .filter(entry => entry[1])
      .map(entry => entry[0])
      .toSet();
    if (this.state.drawMode === "draw") {
      this.props.draw(mask);
    } else {
      this.props.erase(mask);
    }
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

const clamp = (min: number, val: number, max: number) =>
  Math.min(Math.max(min, val), max);

const mapStateToProps = (state: AppState): StateProps => ({
  image: state.image,
  frame: state.image.frames.first()!,
  zoom: state.zoom,
  paletteIndex: 0,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => ({ dispatch });

const mergeProps = (
  stateProps: StateProps,
  { dispatch }: { dispatch: Dispatch<AppState> },
  _: OwnProps,
): Props => ({
  ...stateProps,
  draw: (drawMask: Set<number>) =>
    dispatch(
      draw(0, drawMask, stateProps.image.palette.colors.get(
        stateProps.paletteIndex,
        [0, 0, 0],
      ) as Rgb),
    ),
  erase: (eraseMask: Set<number>) => dispatch(erase(0, eraseMask)),
});

const CanvasView = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  CanvasViewInternal,
);

export { CanvasView };
