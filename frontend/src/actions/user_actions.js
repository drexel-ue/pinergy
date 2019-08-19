import * as ApiUtil from "../util/user_api_util";
import { receiveCurrentUser } from "./session_actions";

export const RECEIVE_USER_UPDATE_ERRORS = "RECEIVE_USER_UPDATE_ERRORS";
export const USER_UPDATED = "USER_UPDATED";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";

const receiveErrors = errors => ({
  type: RECEIVE_USER_UPDATE_ERRORS,
  errors
});
const userUpdated = () => ({
  type: USER_UPDATED
});
export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});
export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const updateUser = (userData, id) => dispatch =>
  ApiUtil.updateUser(userData, id)
    .then(response => {
      dispatch(receiveUser(response.data));
      dispatch(userUpdated());
    })
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    });

export const fetchUser = id => dispatch =>
  ApiUtil.fetchUser(id)
    .then(res => {
      dispatch(receiveUser(res.data));
    })
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    });

export const peopleSearch = queryString => dispatch =>
  ApiUtil.peopleSearch(queryString)
    .then(({ data }) => dispatch(receiveUsers(data)))
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    });
