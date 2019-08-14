import Axios from "axios";

export const scrapeImage = interest => {
  return Axios.post('/api/pins/query', interest)
    .then(res => { debugger })
  // .catch(res => {debugger})  
}