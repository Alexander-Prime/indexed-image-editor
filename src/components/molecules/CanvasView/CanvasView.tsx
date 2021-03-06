import classNames from "classnames";
import { List, Repeat, Set } from "immutable";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { AppState } from "data/AppState";
import { ColorIndex, Frame } from "data/common";
import { draw, erase, Image } from "data/Image";

import "./CanvasView.scss";

interface StateProps {
  image: Image;
  frame: Frame;
  zoom: number;
  selectedColor: ColorIndex;
  currentFrame: number;
}

interface OwnProps {
  className?: string;
}

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
    const { className, image, zoom } = this.props;
    const elementWidth = image.width * zoom;
    const elementHeight = image.height * zoom;
    return (
      <div
        className={classNames("canvasView", className)}
        onContextMenu={this.onContextMenu}
      >
        <canvas
          className="canvasView-canvas"
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
        <div className="canvasView-grid" style={gridStyle(zoom)} />
      </div>
    );
  }

  private renderPixels() {
    const { image, frame, selectedColor } = this.props;
    const bytes = new Uint8ClampedArray(
      frame.reduce((prior: number[], c: ColorIndex | undefined, i: number) => {
        const { drawMask, drawMode } = this.state;
        if (drawMask.get(i)) {
          if (drawMode === "draw") {
            prior.push(...ColorIndex.toRgb(image, selectedColor), 255);
          } else {
            prior.push(0, 0, 0, 0);
          }
        } else {
          if (c === undefined) {
            prior.push(0, 0, 0, 0);
          } else {
            prior.push(...ColorIndex.toRgb(image, c), 255);
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
  frame: state.image.frames.get(state.currentFrame)!,
  zoom: state.zoom,
  selectedColor: state.selectedColor,
  currentFrame: state.currentFrame,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => ({ dispatch });

const mergeProps = (
  stateProps: StateProps,
  { dispatch }: { dispatch: Dispatch<AppState> },
  ownProps: OwnProps,
): Props => ({
  ...stateProps,
  ...ownProps,
  draw: (drawMask: Set<number>) =>
    dispatch(draw(stateProps.currentFrame, drawMask, stateProps.selectedColor)),
  erase: (eraseMask: Set<number>) =>
    dispatch(erase(stateProps.currentFrame, eraseMask)),
});

const CanvasView = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  CanvasViewInternal,
);

export { CanvasView };
