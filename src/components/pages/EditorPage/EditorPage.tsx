import React from "react";
import { HotKeys } from "react-hotkeys";
import { connect } from "react-redux";

import { DrawArea, Sidebar, Strip } from "components/organisms";

import { AppState, setCurrentFrame } from "data/AppState";
import { appendFrame, Image, prependFrame } from "data/Image";
import { Theme } from "data/Theme";

import "./EditorPage.scss";
import { Dispatch } from "redux";

interface StateProps {
  theme: Theme;
  image: Image;
  currentFrame: number;
}

interface DispatchProps {
  dispatch: Dispatch<any>;
}

interface OwnProps {
  handlers: { [action: string]: () => void };
}

type Props = StateProps & DispatchProps & OwnProps;

const keyMap = {
  playPause: ["space", "0"],
  zoomIn: ["w", "i"],
  zoomOut: ["s", "k"],
  stepBack: ["a", "j"],
  stepForward: ["d", "l"],
  shiftBack: { sequence: ["q", "u"], action: "keydown" },
  unshiftBack: { sequence: ["q", "u"], action: "keyup" },
  shiftForward: { sequence: ["e", "o"], action: "keydown" },
  unshiftForward: { sequence: ["e", "o"], action: "keyup" },
};

class EditorPageInternal extends React.PureComponent<Props> {
  private handlers = {
    stepBack: this.stepBack.bind(this),
    stepForward: this.stepForward.bind(this),
  };

  render() {
    const { theme } = this.props;
    return (
      <HotKeys keyMap={keyMap} handlers={this.handlers} focused>
        <div
          className="editorPage"
          style={{
            "--color-bg": theme.backgroundColor,
            "--color-fg": theme.foregroundColor,
            "--color-grid": theme.gridColor,
          }}
        >
          <DrawArea className="editorPage-drawArea" />
          <Sidebar />
          <Strip />
        </div>
      </HotKeys>
    );
  }

  private stepBack() {
    const { currentFrame, dispatch } = this.props;
    if (currentFrame === 0) {
      dispatch(prependFrame());
    }
    dispatch(setCurrentFrame(Math.max(currentFrame - 1, 0)));
  }

  private stepForward() {
    const { currentFrame, dispatch, image } = this.props;
    if (currentFrame === image.frames.size - 1) {
      dispatch(appendFrame());
    }
    dispatch(setCurrentFrame(currentFrame + 1));
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  theme: state.theme,
  currentFrame: state.currentFrame,
  image: state.image,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  dispatch,
});

const EditorPage = connect(mapStateToProps, mapDispatchToProps)(
  EditorPageInternal,
);

export { EditorPage };
