import * as ApiUtil from "../util/user_api_util";
import { receiveCurrentUser } from "./session_actions";

export const RECEIVE_USER_UPDATE_ERRORS = "RECEIVE_USER_UPDATE_ERRORS";
export const USER_UPDATED = "USER_UPDATED";

export const receiveErrors = errors => ({
  type: RECEIVE_USER_UPDATE_ERRORS,
  errors
});

export const updateUser = (userData, id) => dispatch =>
  ApiUtil.updateUser(userData, id)
    .then(user => {
      dispatch(receiveCurrentUser(user));
    })
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    });
