import { RECEIVE_USER_BOARDS, RECEIVE_ONE_BOARD } from "../actions/board_actions";
import { merge } from "lodash";

const boardsReducer = (
  state = { all: {}, user: {}, board: {}, new: undefined },
  action
) => {
  // debugger
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_USER_BOARDS:
      newState.user = action.boards.data;
      return newState;
    case RECEIVE_ONE_BOARD:
      newState.board = action.boards.data
      return newState;
    default:
      return state;
  }
};

export default boardsReducer;
