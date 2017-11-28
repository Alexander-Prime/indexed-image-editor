import classNames from "classnames";
import React from "react";

import { RampView } from "components/molecules";

import "./PaletteView.scss";

interface Props {
  className?: string;
}

const PaletteView = (props: Props) => (
  <div className={classNames("palette", props.className)}>
    <header className="palette-header">Palette</header>
    <RampView className="palette-ramp" name="Ramp A" />
    <RampView className="palette-ramp" name="Ramp B" />
    <RampView className="palette-ramp" name="Ramp C" />
  </div>
);

export { PaletteView };
