import axios from "axios";


export const getAwsUrl = image => axios.post("/api/images/image-upload", image);

export const scrape = (url) =>
  axios.post("/api/images/scrape", { url });
