import * as ApiUtil from "../util/user_api_util";

export const RECEIVE_USER_UPDATE_ERRORS = "RECEIVE_USER_UPDATE_ERRORS";
export const RECEIVE_USER_SEARCH_ERRORS = "RECEIVE_USER_SEARCH_ERRORS";
export const RECEIVE_USER_FOLLOW_ERRORS = "RECEIVE_USER_FOLLOW_ERRORS";
export const USER_UPDATED = "USER_UPDATED";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";

const receiveUserUpdateErrors = errors => ({
  type: RECEIVE_USER_UPDATE_ERRORS,
  errors
});
const receiveUserSearchErrors = errors => ({
  type: RECEIVE_USER_SEARCH_ERRORS,
  errors
});
const receiveUserFollowErrors = errors => ({
  type: RECEIVE_USER_FOLLOW_ERRORS,
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
      dispatch(receiveUserUpdateErrors(err.response.data));
    });
export const fetchUser = id => dispatch =>
  ApiUtil.fetchUser(id)
    .then(res => {
      dispatch(receiveUser(res.data));
    })
    .catch(err => {
      dispatch(receiveUserSearchErrors(err.response.data));
    });
export const peopleSearch = (users, queryString) => dispatch => {
  // const matches = users
  //   .filter(user => {
  //     debugger;
  //     new RegExp("^" + queryString.toLowerCase()).test(
  //       user.firstName.toLowerCase()
  //     ) ||
  //       new RegExp("^" + queryString.toLowerCase()).test(
  //         user.lastName.toLowerCase()
  //       ) ||
  //       new RegExp("^" + queryString.toLowerCase()).test(
  //         user.username.toLowerCase()
  //       );
  //   })
  //   .slice(0, 3);

  // return matches.length > 0
  //   ? matches
  //   :
  return ApiUtil.peopleSearch(queryString)
    .then(({ data }) => {
      return dispatch(receiveUsers(data));
    })
    .catch(err => {
      return dispatch(receiveUserUpdateErrors(err.response.data));
    });
};
export const followUser = (followerId, followeeId) => dispatch =>
  ApiUtil.followUser(followerId, followeeId)
    .then(({ data }) => {
      dispatch(updateUser(data));
    })
    .catch(err => {
      dispatch(receiveUserFollowErrors(err.response.data));
    });
