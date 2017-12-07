import classNames from "classnames";
import React from "react";

import { Rgb } from "common/types";

interface Props {
  className?: string;
  color: Rgb;
}

const Swatch = (props: Props) => (
  <div
    className={classNames("swatch", props.className)}
    style={{ background: Rgb.toHex(props.color) }}
  />
);

export { Swatch };
