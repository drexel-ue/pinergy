import Axios from "axios";

export const getUserBoards = user_id => Axios.get(`/api/boards/:${user_id}/boards`);

