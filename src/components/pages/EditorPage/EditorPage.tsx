import React from "react";

import { CanvasView, Sidebar, StripView } from "components/organisms";

import "./EditorPage.scss";

interface Props {}

const EditorPage = (_: Props) => (
  <div className="editorPage">
    <CanvasView />
    <Sidebar />
    <StripView />
  </div>
);

export { EditorPage };
