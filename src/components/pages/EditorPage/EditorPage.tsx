import React from "react";
import { HotKeys } from "react-hotkeys";
import { connect } from "react-redux";

import { DrawArea, Sidebar, Strip } from "components/organisms";

import { AppState } from "data/AppState";
import { Theme } from "data/Theme";

import "./EditorPage.scss";

interface StateProps {
  theme: Theme;
}

interface OwnProps {}

type Props = StateProps & OwnProps;

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
  <HotKeys keyMap={keyMap} focused>
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

const EditorPage = connect(mapStateToProps)(EditorPageInternal);

export { EditorPage };
