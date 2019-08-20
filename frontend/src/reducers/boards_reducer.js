import { RECEIVE_USER_BOARDS } from "../actions/board_actions";
import { merge } from "lodash";

const boardsReducer = (
  state = { all: {}, user: {}, new: undefined },
  action
) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_USER_BOARDS:
      // debugger;
      newState.user = action.boards;
      return newState;
    default:
      return state;
  }
};

export default boardsReducer;