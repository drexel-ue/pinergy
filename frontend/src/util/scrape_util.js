import Axios from "axios";

export const scrapeInterests = () =>
  Axios.post("/api/pins/query", { keyWords: interests });
