import classNames from "classnames";
import React from "react";

import "./Fab.scss";

interface Props {
  className?: string;
}

const Fab = (props: Props) => (
  <button className={classNames("fab", props.className)}>⌗</button>
);

export { Fab };
