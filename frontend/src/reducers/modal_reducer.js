import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SHOW_FIRST_SIGN_UP_STEP,
  MOVE_TO_SECOND_SIGN_UP_STEP,
  MOVE_TO_THIRD_SIGN_UP_STEP,
  MOVE_TO_FOURTH_SIGN_UP_STEP,
  MOVE_TO_FIFTH_SIGN_UP_STEP,
  MOVE_TO_LOGIN,
  SHOW_PIN
} from "../actions/modal_actions";
const defaultState = SHOW_FIRST_SIGN_UP_STEP;
export default function modalReducer(state = defaultState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { action: action.modal };
    case SHOW_FIRST_SIGN_UP_STEP:
      return { action: action.type };
    case MOVE_TO_SECOND_SIGN_UP_STEP:
      return { action: action.type };
    case MOVE_TO_THIRD_SIGN_UP_STEP:
      return { action: action.type };
    case MOVE_TO_FOURTH_SIGN_UP_STEP:
      return { action: action.type };
    case MOVE_TO_FIFTH_SIGN_UP_STEP:
      return { action: action.type };
    case MOVE_TO_LOGIN:
      return { action: action.type };
    case SHOW_PIN:
      return { action: action.type, id: action.id };
    case CLOSE_MODAL:
      return { action: action.type };
    default:
      return state;
  }
}
