import classNames from "classnames";
import React from "react";

import "./Icon.scss";

interface CommonProps {
  className?: string;
}

interface SrcProps extends CommonProps {
  src: string;
  name?: undefined;
}

interface NameProps extends CommonProps {
  src?: undefined;
  name: string;
}

type Props = SrcProps | NameProps;

const Icon = (props: Props) => {
  const className = classNames("icon", props.className);
  return typeof props.name === "undefined" ? (
    <img className={className} src={props.src} />
  ) : (
    <span className={className}>{props.name}</span>
  );
};

export { Icon };
