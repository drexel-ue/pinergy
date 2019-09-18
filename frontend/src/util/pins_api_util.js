import Axios from "axios";

export const getPins = tags => Axios.post("/api/pins/get", { tags });

export const fetchPin = id => Axios.post("/api/pins/fetch", { id });

export const repin = (pin, boardId) =>
  Axios.post("/api/pins/repin", { pin, boardId });
