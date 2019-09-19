import Axios from "axios";

export const getPins = tags => Axios.post("/api/pins/get", { tags });

export const createPins = data => Axios.post(
    "/api/pins/createpin",
    {
        data
        // headers: {
        //     'Content-Type': 'form-data'
        // }
    });