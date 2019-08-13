import { OPEN_MODAL, CLOSE_MODAL, SHOW_FIRST_SIGN_UP_STEP, MOVE_TO_SECOND_SIGN_UP_STEP } from "../actions/modal_actions";

const default_test_user = {
  
}

export default function modalReducer(state = null, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case SHOW_FIRST_SIGN_UP_STEP:
      return action.type;
    case MOVE_TO_SECOND_SIGN_UP_STEP:
      return action.type;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}
