import classNames from "classnames";
import React from "react";

import { Rgb } from "common/types";

import "./Swatch.scss";

interface Props {
  className?: string;
  color: Rgb;
}

const Swatch = (props: Props) => (
  <div
    className={classNames("swatch", props.className)}
    style={{
      "--swatch-color": Rgb.toHex(props.color),
    }}
  />
);

export { Swatch };
