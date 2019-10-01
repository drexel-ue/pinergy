import Axios from "axios";

export const getPins = tags => Axios.post("/api/pins/get", { tags });

export const createPins = data =>
  Axios.post("/api/pins/createpin", {
    data
  });

export const findBoardPins = boardId => Axios.post("/api/pins/getpins", { boardId })

export const findBoardPreview = boardId => Axios.post("/api/pins/getpreviews", { boardId })

