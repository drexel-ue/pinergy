import { RECEIVE_INTERESTS, RECEIVE_URLS } from "../actions/scrape_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_INTERESTS:
      return action.interests;
    case RECEIVE_URLS:
      return action.urls
    default:
      return state;
  }
};
