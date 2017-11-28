import React from "react";
import ReactDom from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";

import { EditorPage } from "components/pages";

import "./index.scss";
import { configureStore } from "./store";

const store = configureStore();

const rootElem = document.querySelector(".root");

const renderRoot = () => {
  const editor = (
    <Provider store={store}>
      <EditorPage />
    </Provider>
  );
  ReactDom.render(
    process.env.NODE_ENV === "development" ? (
      <AppContainer>{editor}</AppContainer>
    ) : (
      editor
    ),
    rootElem,
  );
};

renderRoot();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("components/pages", renderRoot);
}
