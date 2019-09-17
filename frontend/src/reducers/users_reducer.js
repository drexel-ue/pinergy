import { RECEIVE_USER, RECEIVE_USERS } from "../actions/user_actions";
// import { RECEIVE_FOLLOW, REMOVE_FOLLOW } from '../actions/followings_actions';
import { merge } from "lodash";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    // case RECEIVE_FOLLOW:
    //   newState[action.follow.followed_user_id].followerIds.push(action.follow.user_id)
    //   newState[action.follow.user_id].followingIds.push(action.follow.followed_user_id)
    //   return newState;
    // case REMOVE_FOLLOW:
    //   newState[action.follow.followed_user_id].followerIds = newState[action.follow.followed_user_id].followerIds
    //     .filter(userId => userId !== action.follow.user_id)
    //   newState[action.follow.user_id].followingIds = newState[action.follow.user_id].followingIds
    //     .filter(followedId => followedId !== action.follow.followed_user_id)
    //   return newState;
    case RECEIVE_USER:
      return merge({}, state, { [action.user._id]: action.user });
    case RECEIVE_USERS:
      return merge(
        {},
        state,
        action.users.reduce((pojo, pin) => {
          pojo[pin._id] = pin;
          return pojo;
        }, {})
      );
    default:
      return state;
  }
};

export default usersReducer;
