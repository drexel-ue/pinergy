import Axios from "axios";
import interests from "../util/interest_util";

export const scrape = (url) =>
  Axios.post("/api/images/scrape", { url });

