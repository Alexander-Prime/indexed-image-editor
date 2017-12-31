import classNames from "classnames";
import { List } from "immutable";
import React from "react";

import { Icon } from "components/atoms";

import "./Frame.scss";

interface Props {
  className?: string;
  frame: List<number | undefined>;
}

const Frame = (props: Props) => (
  <div className={classNames("frame", props.className)}>
    <div className="frame-number">1</div>
    <canvas width="128" height="128" className="frame-thumbnail" />
    <Icon className="frame-indicator" name="arrow_drop_up" />
  </div>
);

export { Frame };
