import React from "react";
import { connect } from "react-redux";

import { AppState } from "data/AppState";
import { Palette } from "data/Palette";
import { Strip } from "data/Strip";

import { FrameView } from "components/molecules";

import "./StripView.scss";

interface StateProps {
  strip: Strip;
  palette: Palette;
}

interface OwnProps {}

type Props = StateProps & OwnProps;

const StripViewInternal = (props: Props) => (
  <div className="stripView">
    {props.strip.frames.map((frame, i) => <FrameView frame={frame} key={i} />)}
  </div>
);

const mapStateToProps = (state: AppState): StateProps => ({
  strip: state.image.strip,
  palette: state.image.palette,
});

const StripView = connect(mapStateToProps)(StripViewInternal);

export { StripView };
