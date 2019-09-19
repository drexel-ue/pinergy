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
      newState.user = action.boards.data;
      return newState;
    default:
      return state;
  }
};

export default boardsReducer;
