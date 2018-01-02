import { combineReducers } from "redux-immutable";

import { reducer as image } from "data/Image";

import { Action, ActionTypes } from "./actions";
import { AppState } from "./model";

const ownReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case ActionTypes.PICK_COLOR: {
      return state.set("selectedColor", action.payload.index);
    }
    case ActionTypes.STEP_BACK: {
      return state.set("currentFrame", Math.max(state.currentFrame - 1, 0));
    }
    case ActionTypes.STEP_FORWARD: {
      return state.set(
        "currentFrame",
        Math.min(state.currentFrame + 1, state.image.frames.size - 1),
      );
    }
    default: {
      return state;
    }
  }
};

const identity = (_: any) => _;

const childReducer = combineReducers<AppState>({
  theme: identity,
  image,
  zoom: identity,
  selectedColor: identity,
  currentFrame: identity,
});

const reducer = (state: AppState, action: Action) => {
  return [ownReducer, childReducer].reduce((s, r) => r(s, action), state);
};

export { reducer };
