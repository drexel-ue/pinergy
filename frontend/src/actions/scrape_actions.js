import Axios from "axios";
import interests from "../util/interest_util";

export const RECEIVE_INTERESTS = "RECEIVE_INTERESTS";

const receiveInterests = interests => ({
  type: RECEIVE_INTERESTS,
  interests
});

export const scrapeInterests = () => dispatch => {
  return 
    .then(({ data }) => {
      dispatch(receiveInterests(data));
    })
    .catch(res => {
      debugger;
    });
};
