import { combineReducers } from "redux-immutable";

import { reducer as image } from "data/Image";

import { AppState } from "./model";

const reducer = combineReducers<AppState>({
  theme: (_: any) => _,
  image,
  zoom: (_: any) => _,
});

export { reducer };
