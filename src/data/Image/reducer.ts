import { List } from "immutable";

import { Action, ActionTypes } from "./actions";
import { Image } from "./model";

const reducer = (state: Image = new Image(), action: Action): Image => {
  switch (action.type) {
    case ActionTypes.DRAW: {
      const { frameIndex, drawMask, colorIndex } = action.payload;
      return state.updateIn(["frames", frameIndex], (frame: List<number>) =>
        frame.map((c, i) => (drawMask.has(i) ? colorIndex : c)),
      );
    }
    case ActionTypes.ERASE: {
      const { frameIndex, eraseMask } = action.payload;
      return state.updateIn(["frames", frameIndex], (frame: List<number>) =>
        frame.map((c, i) => (eraseMask.has(i) ? undefined : c)),
      );
    }
    case ActionTypes.APPEND_FRAME: {
      return state.updateIn(["frames"], (frames: List<List<number>>) =>
        frames.push(
          frames.last() || List().setSize(state.width * state.height),
        ),
      );
    }
    case ActionTypes.PREPEND_FRAME: {
      return state.updateIn(["frames"], (frames: List<List<number>>) =>
        frames.unshift(
          frames.first() || List().setSize(state.width * state.height),
        ),
      );
    }
    default: {
      return state;
    }
  }
};

export { reducer };
