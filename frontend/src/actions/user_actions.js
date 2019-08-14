import * as ApiUtil from "../util/user_api_util";
import { receiveCurrentUser } from "./session_actions";

export const updateUser = userData => dispatch =>
  ApiUtil.updateUser(userData).then(user => {
    dispatch(receiveCurrentUser(user));
  });
