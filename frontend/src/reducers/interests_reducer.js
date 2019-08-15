import { RECEIVE_INTERESTS } from "../actions/scrape_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_INTERESTS:
      return action.type;
    default:
      return state;
  }
};
