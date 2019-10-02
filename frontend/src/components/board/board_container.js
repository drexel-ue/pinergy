import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Board from "./board";
import { fetchUserBoards } from "../../actions/board_actions";
import { fetchUserByUserName } from "../../actions/user_actions";

const msp = ({ session, entities }, ownProps) => {
  let boards = [];

  if (entities.boards.user) {
    boards = Object.values(entities.boards.user);
  }

  return {
    currentUser: session.isAuthenticated ? entities.users[session.user.id] : {},
    user: Object.values(entities.users).find(
      user => user.username == ownProps.match.params.username
    ),
    boards: boards
  };
};

const mdp = dispatch => {
  return {
    fetchUserBoards: id => dispatch(fetchUserBoards(id)),
    fetchUserByUserName: username => dispatch(fetchUserByUserName(username))
  };
};

export default withRouter(
  connect(
    msp,
    mdp
  )(Board)
);
