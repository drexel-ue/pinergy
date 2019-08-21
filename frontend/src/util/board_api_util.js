import Axios from "axios";

export const getUserBoards = user_id => {
    return Axios.get(`/api/boards/${user_id}`);
}



