import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Icon } from "components/atoms";
import { FrameView } from "components/molecules";

import { AppState } from "data/AppState";
import { appendFrame, Image, prependFrame } from "data/Image";

import "./Strip.scss";

interface StateProps {
  image: Image;
  currentFrame: number;
}

interface DispatchProps {
  dispatchPrependFrame: () => void;
  dispatchAppendFrame: () => void;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class StripInternal extends React.PureComponent<Props> {
  render() {
    const {
      currentFrame,
      image,
      dispatchPrependFrame,
      dispatchAppendFrame,
    } = this.props;
    return (
      <div className="strip">
        <button className="strip-addButton" onClick={dispatchPrependFrame}>
          <Icon name="add" />
        </button>
        {image.frames.map((frame, i) => (
          <FrameView
            className="strip-frame"
            image={image}
            frame={frame}
            key={i}
            index={i}
            selected={i === currentFrame}
            visible={i === currentFrame}
          />
        ))}
        <button className="strip-addButton" onClick={dispatchAppendFrame}>
          <Icon name="add" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  image: state.image,
  currentFrame: state.currentFrame,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  dispatchAppendFrame: () => dispatch(appendFrame()),
  dispatchPrependFrame: () => dispatch(prependFrame()),
});

const Strip = connect(mapStateToProps, mapDispatchToProps)(StripInternal);

export { Strip };
