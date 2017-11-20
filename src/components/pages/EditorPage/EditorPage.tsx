import React from "react";

import { CanvasView, Sidebar } from "components/organisms";

import "./EditorPage.scss";

interface Props {}

const EditorPage = (_: Props) => {
  return (
    <div className="editorPage">
      <CanvasView />
      <Sidebar />
    </div>
  );
};

export { EditorPage };
