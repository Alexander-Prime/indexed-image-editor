import { Set } from "immutable";

const enum ActionTypes {
  DRAW = "[Image] Draw",
  ERASE = "[Image] Erase",
}
type Action = DrawAction | EraseAction;

interface DrawAction {
  type: ActionTypes.DRAW;
  payload: { frameIndex: number; drawMask: Set<number>; colorIndex: number };
}
const draw = (
  frameIndex: number,
  drawMask: Set<number>,
  colorIndex: number,
): Action => ({
  type: ActionTypes.DRAW,
  payload: { frameIndex, drawMask, colorIndex },
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
