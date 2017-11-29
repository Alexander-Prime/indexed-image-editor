import classNames from "classnames";
import React from "react";

import "./Fab.scss";

interface Props {
  className?: string;
  children?: {};
}

const Fab = (props: Props) => (
  <button className={classNames("fab", props.className)}>
    {props.children}
  </button>
);

export { Fab };
