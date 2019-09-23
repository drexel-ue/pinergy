import { RECEIVE_USER_BOARDS, RECEIVE_BOARD } from "../actions/board_actions";
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
    case RECEIVE_BOARD:
      if (newState.all) {
        newState.all[action.board._id] = action.board;
      } else {
        newState["all"] = {};
        newState.all[action.board._id] = action.board;
      }
      return newState;
    default:
      return state;
  }
};

export default boardsReducer;
