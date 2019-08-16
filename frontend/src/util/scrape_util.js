import Axios from "axios";
import interests from "../util/interest_util";

export const scrapeInterests = () =>
  Axios.post("/api/pins/query", { keyWords: interests });

export const scrape = keyWords => Axios.post("/api/pins/query", keyWords);