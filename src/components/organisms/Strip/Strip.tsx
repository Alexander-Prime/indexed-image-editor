import { List } from "immutable";
import React from "react";
import { connect } from "react-redux";

import { AppState } from "data/AppState";
import { Palette } from "data/Palette";

import { Frame } from "components/molecules";

import "./Strip.scss";

interface StateProps {
  frames: List<List<number | undefined>>;
  palette: Palette;
}

interface OwnProps {}

type Props = StateProps & OwnProps;

const StripInternal = (props: Props) => (
  <div className="strip">
    {props.frames.map((frame, i) => (
      <Frame className="strip-frame" frame={frame} key={i} />
    ))}
  </div>
);

const mapStateToProps = (state: AppState): StateProps => ({
  frames: state.image.frames,
  palette: state.image.palette,
});

const Strip = connect(mapStateToProps)(StripInternal);

export { Strip };
