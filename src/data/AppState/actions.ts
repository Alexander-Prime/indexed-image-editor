const enum ActionTypes {
  PICK_COLOR = "[AppState] Pick color",
  STEP_BACK = "[AppState] Step back",
  STEP_FORWARD = "[AppState] Step forward",
}
type Action = PickColorAction | StepBackAction | StepForwardAction;

interface PickColorAction {
  type: ActionTypes.PICK_COLOR;
  payload: { index: number };
}
const pickColor = (index: number): Action => ({
  type: ActionTypes.PICK_COLOR,
  payload: { index },
});

interface StepBackAction {
  type: ActionTypes.STEP_BACK;
}
const stepBack = (): Action => ({
  type: ActionTypes.STEP_BACK,
});

interface StepForwardAction {
  type: ActionTypes.STEP_FORWARD;
}
const stepForward = (): Action => ({
  type: ActionTypes.STEP_FORWARD,
});

export { Action, ActionTypes };
export { pickColor, stepBack, stepForward };
