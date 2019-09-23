import {
  RECEIVE_USER_BOARDS,
  RECEIVE_USER_BOARD
} from "../actions/board_actions";
import { merge } from "lodash";

const boardsReducer = (
  state = { all: {}, user: {}, new: undefined },
  action
) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_USER_BOARDS:
      newState.user = action.boards.data;
      return newState;
    case RECEIVE_USER_BOARD:
      if (newState.user) {
        newState.user.push(action.board);
      } else {
        newState["user"] = [];
        newState.user.push(action.board);
      }
      return newState;
    default:
      return state;
  }
};

export default boardsReducer;
