import * as ApiUtil from "../util/pins_api_util";

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


export const createPins = data => dispatch => {
  // debugger
  ApiUtil.createPins(data)
    .then(({ data }) => {
      // debugger
      dispatch(receivePin(data))
    }).catch(error => {
      dispatch(receivePinError())
    })
}