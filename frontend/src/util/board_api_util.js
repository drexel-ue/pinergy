import Axios from "axios";

export const getUserBoards = user_id => {
    return Axios.get(`/api/boards/${user_id}`);
}



export const findBoardInfo = boardId => Axios.post("/api/boards/getboard", { boardId })