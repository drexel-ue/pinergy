import * as ApiUtil from "../util/pins_api_util";
import { receiveImage } from "./image_actions";
import { receiveUserBoard } from "./board_actions";

export const RECEIVE_PINS = "RECEIVE_PINS";
export const RECEIVE_PIN = "RECEIVE_PIN";
export const RECEIVE_PIN_ERROR = "RECEIVE_PIN_ERROR";

const receivePins = pins => ({
  type: RECEIVE_PINS,
  pins
});
const receivePin = pin => ({
  type: RECEIVE_PIN,
  pin
});
const receivePinError = () => ({
  type: RECEIVE_PIN_ERROR
});
//
export const fetchBoardPins = boardId => dispatch => {
  return ApiUtil.findBoardPins(boardId)
    .then(res => {
      // 
      dispatch(receivePins(res.data));
      return res.data;
    })
    .catch(error => {
      dispatch(receivePinError());
    });
};

export const fetchBoardPreviews = boardId => dispatch => {
  return ApiUtil.findBoardPreview(boardId)
    .then(res => {
      dispatch(receivePins(res.data));
      return res.data;
    })
    .catch(error => {
      dispatch(receivePinError());
    });
};

export const fetchPins = tags => dispatch =>
  ApiUtil.getPins(tags)
    .then(res => {
      const pins = Object.values(res.data);

      if (pins.length === 1) {
        dispatch(receivePin(pins[0]));
      } else {
        dispatch(receivePins(pins));
      }
    })
    .catch(error => {
      dispatch(receivePinError());
    });

export const fetchPin = id => dispatch =>
  ApiUtil.fetchPin(id)
    .then(({ data }) => {
      dispatch(receivePin(data));
    })
    .catch(error => {
      dispatch(receivePinError());
    });

export const repin = (pin, boardId, userId) => dispatch =>
  ApiUtil.repin(pin, boardId, userId)
    .then(({ data }) => {
      let { repin, image, board } = data;
      dispatch(receivePin(repin));
      dispatch(receiveImage(image));
      dispatch(receiveUserBoard(board));
    })
    .catch(error => {
      dispatch(receivePinError());
    });

export const createPins = data => dispatch =>
  ApiUtil.createPins(data)
    .then(({ data }) => {
      dispatch(receivePin(data));
      return data;
    })
    .catch(error => {
      dispatch(receivePinError());
    });
