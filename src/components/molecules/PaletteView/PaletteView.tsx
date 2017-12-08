import classNames from "classnames";
import React from "react";

import { Swatch } from "components/atoms";
import { RampHeading } from "components/molecules";

import { Palette } from "data/Palette";

import "./PaletteView.scss";

interface Props {
  className?: string;
  palette: Palette;
  selectedColor: number;
}

const PaletteView = (props: Props) => (
  <div className={classNames("palette", props.className)}>
    <header className="palette-header">Palette</header>
    <div className="palette-colors">
      {props.palette.colors.map((color, i) => {
        const ramp = props.palette.ramps.get(i);
        return [
          ramp && (
            <RampHeading
              className="palette-colors-divider"
              key={`${ramp.name}@${i}`}
              palette={props.palette}
              index={i}
              ramp={ramp}
            />
          ),
          <Swatch
            className={classNames("palette-colors-swatch", {
              "is-selected": props.selectedColor === i,
            })}
            key={i}
            color={color}
          />,
        ];
      })}
    </div>
  </div>
);

export { PaletteView };
