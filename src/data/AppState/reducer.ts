import Redux from "redux";

import { AppState } from "./model";

const reducer = (
  state: AppState = new AppState(),
  action: Redux.Action,
): AppState => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export { reducer };
