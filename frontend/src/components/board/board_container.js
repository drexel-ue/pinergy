import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Board from "./board";
import { fetchUserBoards } from "../../actions/board_actions";

const msp = ({ session, entities }, ownProps) => {
  return {
    currentUser: session.isAuthenticated ? entities.users[session.user.id] : {}, 
    user: Object.values(entities.users).find(
      user => user.username == ownProps.match.params.username
    ),
    boards: entities.boards
  };
};

const mdp = dispatch => {
  return {
    fetchUserBoards: id => dispatch(fetchUserBoards(id))
  };
};

export default withRouter(
  connect(
    msp,
    mdp
  )(Board)
);
