import React from "react";
import { connect } from "react-redux";

import { CanvasView, Sidebar, Strip } from "components/organisms";

import { AppState } from "data/AppState";
import { Theme } from "data/Theme";

import "./EditorPage.scss";

interface StateProps {
  theme: Theme;
}

interface OwnProps {}

type Props = StateProps & OwnProps;

const EditorPageInternal = (props: Props) => (
  <div
    className="editorPage"
    style={{
      "--color-bg": props.theme.backgroundColor,
      "--color-fg": props.theme.foregroundColor,
      "--color-grid": props.theme.gridColor,
    }}
  >
    <CanvasView />
    <Sidebar />
    <Strip />
  </div>
);

const mapStateToProps = (state: AppState): StateProps => ({
  theme: state.theme,
});

const EditorPage = connect(mapStateToProps)(EditorPageInternal);

export { EditorPage };
