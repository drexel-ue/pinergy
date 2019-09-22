import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PinShow from "./pin_show";
import { fetchPin, repin } from "../../actions/pin_actions";
import { fetchUserBoards } from "../../actions/board_actions";
import { fetchUser } from "../../actions/user_actions";

const msp = ({ entities, session }, { match }) => {
  let boards;
  if (entities.boards.user) {
    boards = Object.values(entities.boards.user);
  }
  return {
    pin: entities.pins[match.params.id],
    boards,
    id: session.user.id
  };
};
const mdp = dispatch => ({
  fetchPin: id => dispatch(fetchPin(id)),
  fetchCurrentUser: id => dispatch(fetchUser(id)),
  fetchUserBoards: id => dispatch(fetchUserBoards(id)),
  repin: (pin, boardId, userId) => dispatch(repin(pin, boardId, userId))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(PinShow)
);
