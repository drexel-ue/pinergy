import axios from "axios";

export const getAwsUrl = image => axios.post("/api/images/image-upload", image);

export const scrape = async url => {
  const res = await axios.post("/api/images/scrape", { url });
  return res;
};
