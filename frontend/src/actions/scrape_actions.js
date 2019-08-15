import Axios from "axios";
import interests from "";

export const scrapeInterests = () => dispatch => {
  return Axios.post("/api/pins/query", interest)
    .then(res => {
      debugger;
    })
    .catch(res => {
      debugger;
    });
};
