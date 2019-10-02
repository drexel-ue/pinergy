import { RECEIVE_IMAGE, RECEIVE_IMAGES } from "../actions/image_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_IMAGE:
      newState = Object.assign({}, state);
      newState[action.image._id] = action.image;
      return newState;
    case RECEIVE_IMAGES:
      return Object.assign(
        {},
        state,
        action.boards.reduce((pojo, board) => {
          pojo[board._id] = board;
          return pojo;
        }, {})
      );
    default:
      return state;
  }
};
