import Axios from "axios";

export const scrape = (url) =>
  Axios.post("/api/images/scrape", { url });

