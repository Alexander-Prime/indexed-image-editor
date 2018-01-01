import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Icon } from "components/atoms";
import { Frame } from "components/molecules";

import { AppState } from "data/AppState";
import { Image, prependFrame, appendFrame } from "data/Image";

import "./Strip.scss";

interface StateProps {
  image: Image;
}

interface DispatchProps {
  prependFrame: () => void;
  appendFrame: () => void;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class StripInternal extends React.PureComponent<Props> {
  render() {
    const { image, prependFrame, appendFrame } = this.props;
    return (
      <div className="strip">
        <button className="strip-addButton" onClick={prependFrame}>
          <Icon name="add" />
        </button>
        {image.frames.map((frame, i) => (
          <Frame className="strip-frame" image={image} frame={frame} key={i} />
        ))}
        <button className="strip-addButton" onClick={appendFrame}>
          <Icon name="add" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  image: state.image,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  appendFrame: () => dispatch(appendFrame()),
  prependFrame: () => dispatch(prependFrame()),
});

const Strip = connect(mapStateToProps, mapDispatchToProps)(StripInternal);

export { Strip };
