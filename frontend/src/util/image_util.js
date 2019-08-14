import Axios from "axios";

export const scrapeImage = interest => {
  return Axios.post('/api/pin/query', interest)
    .then( res => {debugger})
}