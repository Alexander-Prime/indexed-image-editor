import classNames from "classnames";
import React from "react";

import { Swatch } from "components/atoms";

import { ColorIndex } from "data/common";
import { Ramp } from "data/Ramp";

import "./RampView.scss";

interface Props {
  className?: string;
  index: number;
  ramp: Ramp;
  selectedColor: ColorIndex;
  onPickColor: (colorIndex: ColorIndex) => void;
}

class RampView extends React.PureComponent<Props> {
  render() {
    const { className, ramp, index, selectedColor } = this.props;
    return (
      <div className={classNames("ramp", classNames(className))}>
        <div className="ramp-heading">{ramp.name}</div>
        {ramp.colors.map((color, i) => (
          <Swatch
            className={classNames("ramp-swatch", {
              "is-selected": ColorIndex.matches(selectedColor, [index, i]),
            })}
            color={color}
            index={i}
            key={`${color}@${i}`}
            onPick={this.onPickColor}
          />
        ))}
      </div>
    );
  }

  private onPickColor = (index: number) => {
    this.props.onPickColor([this.props.index, index]);
  };
}

export { RampView };
