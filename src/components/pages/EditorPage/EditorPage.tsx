import React from "react";
import { HotKeys } from "react-hotkeys";
import { connect } from "react-redux";

import { DrawArea, Sidebar, Strip } from "components/organisms";

import { AppState, stepBack, stepForward } from "data/AppState";
import { Theme } from "data/Theme";

import "./EditorPage.scss";
import { Dispatch } from "redux";

interface StateProps {
  theme: Theme;
}

interface DispatchProps {
  handlers: { [action: string]: () => void };
}

interface OwnProps {}

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

const EditorPageInternal = (props: Props) => (
  <HotKeys keyMap={keyMap} handlers={props.handlers} focused>
    <div
      className="editorPage"
      style={{
        "--color-bg": props.theme.backgroundColor,
        "--color-fg": props.theme.foregroundColor,
        "--color-grid": props.theme.gridColor,
      }}
    >
      <DrawArea className="editorPage-drawArea" />
      <Sidebar />
      <Strip />
    </div>
  </HotKeys>
);

const mapStateToProps = (state: AppState): StateProps => ({
  theme: state.theme,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  handlers: {
    stepBack: () => dispatch(stepBack()),
    stepForward: () => dispatch(stepForward()),
  },
});

const EditorPage = connect(mapStateToProps, mapDispatchToProps)(
  EditorPageInternal,
);

export { EditorPage };
