import * as ApiUtil from "../util/board_api_util";

export const RECEIVE_USER_BOARDS = "RECEIVE_USER_BOARDS";
export const RECEIVE_BOARD_ERROR = "RECEIVE_BOARD_ERROR";
export const RECEIVE_ONE_BOARD = "RECEIVE_ONE_BOARD"
const receiveUserBoards = boards => ({
  type: RECEIVE_USER_BOARDS,
  boards
});

const receiveOneBoard = boards => ({
  type: RECEIVE_ONE_BOARD,
  boards
})
const receiveBoardError = () => ({
  type: RECEIVE_BOARD_ERROR
});

export const fetchUserBoards = user_id => dispatch =>
  ApiUtil.getUserBoards(user_id)
    .then(boards => {
      //    ;
      dispatch(receiveUserBoards(boards));
    })
    .catch(error => {
      //    ;
      dispatch(receiveBoardError());
    });

export const fetchSingleBoard = boardId => dispatch => {
  // debugger
  return ApiUtil.findBoardInfo(boardId).then(boards => {
    dispatch(receiveOneBoard(boards))
    return boards.data
  }).catch(error => {
    dispatch(receiveBoardError())
  })
}