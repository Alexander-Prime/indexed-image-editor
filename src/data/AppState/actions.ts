const enum ActionTypes {
  PICK_COLOR = "[AppState] Pick color",
}
type Action = PickColorAction;

interface PickColorAction {
  type: ActionTypes.PICK_COLOR;
  payload: { index: number };
}
const pickColor = (index: number): Action => ({
  type: ActionTypes.PICK_COLOR,
  payload: { index },
});

export { Action, ActionTypes };
export { pickColor };
