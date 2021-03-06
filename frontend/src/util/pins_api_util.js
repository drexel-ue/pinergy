import Axios from "axios";

export const getPins = tags => Axios.post("/api/pins/get", { tags });

export const fetchPin = id => Axios.post("/api/pins/fetch", { id });

export const repin = (pin, boardId, userId) =>
  Axios.post("/api/pins/repin", { pin, boardId, userId });

export const createPins = data =>
  Axios.post("/api/pins/createpin", {
    data
  });

export const findBoardPins = boardId => Axios.post("/api/pins/getpins", { boardId })

export const findBoardPreview = boardId => Axios.post("/api/pins/getpreviews", { boardId })

