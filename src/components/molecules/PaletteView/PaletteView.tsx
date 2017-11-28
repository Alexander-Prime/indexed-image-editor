import classNames from "classnames";
import React from "react";

import { RampView } from "components/molecules";

import { Palette } from "data/Palette";

import "./PaletteView.scss";

interface Props {
  className?: string;
  palette: Palette;
}

const PaletteView = (props: Props) => (
  <div className={classNames("palette", props.className)}>
    <header className="palette-header">Palette</header>
    {props.palette.ramps
      .entrySeq()
      .map(entry => (
        <RampView
          className="palette-ramp"
          palette={props.palette}
          index={entry[0]}
          ramp={entry[1]}
        />
      ))}
  </div>
);

export { PaletteView };
