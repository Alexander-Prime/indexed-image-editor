import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { AppState, reducer } from "data/AppState";

const configureStore = (initialState: AppState = new AppState()) => {
  const enhancers = composeWithDevTools();
  const store = initialState
    ? createStore<AppState>(reducer, initialState, enhancers)
    : createStore<AppState>(reducer, enhancers);

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("data/AppState", () => {
      store.replaceReducer(reducer);
    });
  }
  return store;
};

export { configureStore };
