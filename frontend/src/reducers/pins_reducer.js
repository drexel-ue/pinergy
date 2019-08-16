import { RECEIVE_PIN, RECEIVE_PINS } from "../actions/pin_actions";
import { merge } from "lodash";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PIN:
      return merge({}, state, { [action.pin._id]: action.pin });
    case RECEIVE_PINS:
      return merge(
        {},
        state,
        action.pins.reduce((pojo, pin) => {
          pojo[pin._id] = pin;
          return pojo;
        }, {})
      );
    default:
      return state;
  }
};
