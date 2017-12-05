import { List } from "immutable";
import React from "react";
import { connect } from "react-redux";

import { AppState } from "data/AppState";
import { Frame } from "data/Frame";
import { Palette } from "data/Palette";

import { FrameView } from "components/molecules";

import "./Strip.scss";

interface StateProps {
  frames: List<Frame>;
  palette: Palette;
}

interface OwnProps {}

type Props = StateProps & OwnProps;

const StripInternal = (props: Props) => (
  <div className="stripView">
    {props.frames.map((frame, i) => <FrameView frame={frame} key={i} />)}
  </div>
);

const mapStateToProps = (state: AppState): StateProps => ({
  frames: state.image.frames,
  palette: state.image.palette,
});

const Strip = connect(mapStateToProps)(StripInternal);

export { Strip };
