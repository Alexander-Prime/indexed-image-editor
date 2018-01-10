import { ColorIndex } from "data/common";

const enum ActionTypes {
  PICK_COLOR = "[AppState] Pick color",
  SET_CURRENT_FRAME = "[AppState] Set current frame",
  SHIFT_BACK = "[AppState] Shift back",
  UNSHIFT_BACK = "[AppState] Unshift back",
  SHIFT_FORWARD = "[AppState] Shift forward",
  UNSHIFT_FORWARD = "[AppState] Unshift forward",
}
type Action =
  | PickColorAction
  | SetCurrentFrameAction
  | ShiftBackAction
  | UnshiftBackAction
  | ShiftForwardAction
  | UnshiftForwardAction;

interface PickColorAction {
  type: ActionTypes.PICK_COLOR;
  payload: { colorIndex: ColorIndex };
}
const pickColor = (colorIndex: ColorIndex): Action => ({
  type: ActionTypes.PICK_COLOR,
  payload: { colorIndex },
});

interface SetCurrentFrameAction {
  type: ActionTypes.SET_CURRENT_FRAME;
  payload: { frameIndex: number };
}
const setCurrentFrame = (frameIndex: number): Action => ({
  type: ActionTypes.SET_CURRENT_FRAME,
  payload: { frameIndex },
});

interface ShiftBackAction {
  type: ActionTypes.SHIFT_BACK;
}
const shiftBack = (): Action => ({
  type: ActionTypes.SHIFT_BACK,
});

interface UnshiftBackAction {
  type: ActionTypes.UNSHIFT_BACK;
}
const unshiftBack = (): Action => ({
  type: ActionTypes.UNSHIFT_BACK,
});

interface ShiftForwardAction {
  type: ActionTypes.SHIFT_FORWARD;
}
const shiftForward = (): Action => ({
  type: ActionTypes.SHIFT_FORWARD,
});

interface UnshiftForwardAction {
  type: ActionTypes.UNSHIFT_FORWARD;
}
const unshiftForward = (): Action => ({
  type: ActionTypes.UNSHIFT_FORWARD,
});

export { Action, ActionTypes };
export {
  pickColor,
  setCurrentFrame,
  shiftBack,
  unshiftBack,
  shiftForward,
  unshiftForward,
};
