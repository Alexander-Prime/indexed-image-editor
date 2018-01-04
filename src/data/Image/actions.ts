import { Set } from "immutable";

const enum ActionTypes {
  DRAW = "[Image] Draw",
  ERASE = "[Image] Erase",
  APPEND_FRAME = "[Image] Append frame",
  PREPEND_FRAME = "[Image] Prepend frame",
  CYCLE_BACK = "[Image] Cycle back",
  CYCLE_FORWARD = "[Image] Cycle forward",
}
type Action =
  | DrawAction
  | EraseAction
  | AppendFrameAction
  | PrependFrameAction
  | CycleBackAction
  | CycleForwardAction;

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

interface AppendFrameAction {
  type: ActionTypes.APPEND_FRAME;
}
const appendFrame = (): Action => ({
  type: ActionTypes.APPEND_FRAME,
});

interface PrependFrameAction {
  type: ActionTypes.PREPEND_FRAME;
}
const prependFrame = (): Action => ({
  type: ActionTypes.PREPEND_FRAME,
});

interface CycleBackAction {
  type: ActionTypes.CYCLE_BACK;
}
const cycleBack = (): Action => ({
  type: ActionTypes.CYCLE_BACK,
});

interface CycleForwardAction {
  type: ActionTypes.CYCLE_FORWARD;
}
const cycleForward = (): Action => ({
  type: ActionTypes.CYCLE_FORWARD,
});

export { Action, ActionTypes };
export { draw, erase, appendFrame, prependFrame, cycleBack, cycleForward };
