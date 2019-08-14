import {
  USER_UPDATED,
  RECEIVE_USER_UPDATE_ERRORS
} from "../actions/user_actions";

const _nullErrors = [];

export default (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER_UPDATE_ERRORS:
      return action.errors;
    case USER_UPDATED:
      return _nullErrors;
    default:
      return state;
  }
};
