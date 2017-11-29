import classNames from "classnames";
import React from "react";

import { Icon } from "components/atoms";
import { Frame } from "data/Frame";

interface Props {
  className?: string;
  frame: Frame;
}

const FrameView = (props: Props) => (
  <div className={classNames("frame", props.className)}>
    <Icon name="broken_image" />
  </div>
);

export { FrameView };
