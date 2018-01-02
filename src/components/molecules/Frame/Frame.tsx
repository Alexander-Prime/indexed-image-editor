import classNames from "classnames";
import { List } from "immutable";
import React from "react";

import { Icon } from "components/atoms";

import { Image } from "data/Image";

import "./Frame.scss";

interface Props {
  className?: string;
  frame: List<number | undefined>;
  image: Image;
  index: number;
  selected: boolean;
  visible: boolean;
}

class Frame extends React.PureComponent<Props> {
  private ctx: CanvasRenderingContext2D;

  componentDidMount() {
    this.renderPixels();
  }

  componentDidUpdate() {
    this.renderPixels();
  }

  render() {
    const { className, image, index, selected, visible } = this.props;
    const { width, height } = image;
    return (
      <div className={classNames("frame", className)}>
        <div className="frame-number">{index + 1}</div>
        <canvas
          className={classNames("frame-thumbnail", {
            "mod-small": width < 128 && height < 128,
            "is-selected": selected,
          })}
          width={width}
          height={height}
          ref={canvas => {
            if (canvas) {
              this.ctx = canvas!.getContext("2d")!;
            }
          }}
        />
        <Icon
          className={classNames("frame-indicator", { "is-visible": visible })}
          name="arrow_drop_up"
        />
      </div>
    );
  }

  private renderPixels() {
    const { image, frame } = this.props;
    const bytes = new Uint8ClampedArray(
      frame.reduce((prior: number[], c: number | undefined) => {
        if (c === undefined) {
          prior.push(0, 0, 0, 0);
        } else {
          prior.push(...image.palette.colors.get(c, [0, 0, 0]), 255);
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
}

export { Frame };
