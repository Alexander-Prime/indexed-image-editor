import { Set } from "immutable";

import { Rgb } from "common/types";

const enum ActionTypes {
  DRAW = "[Image] Draw",
  ERASE = "[Image] Erase",
}
type Action = DrawAction | EraseAction;

interface DrawAction {
  type: ActionTypes.DRAW;
  payload: { frameIndex: number; drawMask: Set<number>; color: Rgb };
}
const draw = (
  frameIndex: number,
  drawMask: Set<number>,
  color: Rgb,
): Action => ({
  type: ActionTypes.DRAW,
  payload: { frameIndex, drawMask, color },
});

interface EraseAction {
  type: ActionTypes.ERASE;
  payload: { frameIndex: number; eraseMask: Set<number> };
}
const erase = (frameIndex: number, eraseMask: Set<number>): Action => ({
  type: ActionTypes.ERASE,
  payload: { frameIndex, eraseMask },
});

export { Action, ActionTypes };
export { draw, erase };
