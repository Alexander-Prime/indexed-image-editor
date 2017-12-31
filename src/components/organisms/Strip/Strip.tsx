import React from "react";
import { connect } from "react-redux";

import { Frame } from "components/molecules";

import { AppState } from "data/AppState";
import { Image } from "data/Image";

import "./Strip.scss";

interface StateProps {
  image: Image;
}

interface OwnProps {}

type Props = StateProps & OwnProps;

const StripInternal = (props: Props) => (
  <div className="strip">
    {props.image.frames.map((frame, i) => (
      <Frame
        className="strip-frame"
        image={props.image}
        frame={frame}
        key={i}
      />
    ))}
  </div>
);

const mapStateToProps = (state: AppState): StateProps => ({
  image: state.image,
});

const Strip = connect(mapStateToProps)(StripInternal);

export { Strip };
