import classNames from "classnames";
import React from "react";

import { Rgb } from "common/types";

import "./Swatch.scss";

interface Props {
  className?: string;
  color: Rgb;
  index: number;
  onPick?: (index: number) => void;
}

class Swatch extends React.PureComponent<Props> {
  render() {
    const { className, color } = this.props;
    return (
      <div
        className={classNames("swatch", className)}
        style={{
          "--swatch-color": Rgb.toHex(color),
        }}
        onClick={this.onClick}
      />
    );
  }

  private onClick = () => {
    const { index, onPick } = this.props;
    if (onPick) {
      onPick(index);
    }
  };
}

export { Swatch };
