import React from "react";
import ReactDom from "react-dom";
import { AppContainer } from "react-hot-loader";

import { EditorPage } from "components/pages";

import "./index.scss";

const rootElem = document.querySelector(".root");

const renderRoot = () => {
  ReactDom.render(
    process.env.NODE_ENV === "development" ? (
      <AppContainer>
        <EditorPage />
      </AppContainer>
    ) : (
      <EditorPage />
    ),
    rootElem,
  );
};

renderRoot();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("components/pages", renderRoot);
}
