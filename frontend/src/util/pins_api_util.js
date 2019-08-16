import Axios from "axios";

export const getPins = tags => Axios.post("/api/pins/get", { tags });
