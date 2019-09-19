import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import { createPins } from "../../actions/pin_actions";
import { fetchUserBoards } from "../../actions/board_actions";

import PinCreator from "./pin_creator";
const mapStateToProps = ({ session, entities }) => {
  // debugger
  let boards;
  let pinId;
  if (entities.pins) {
    // debugger 
    pinId = Object.keys(entities.pins)[0]
  }
  if (entities.boards.user) {
    boards = Object.values(entities.boards.user);
    // debugger
  }
  return {
    currentUser: entities.users[session.user.id],
    id: session.user.id,
    boards: boards,
    pinId: pinId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: id => dispatch(fetchUser(id)),
    createPins: data => dispatch(createPins(data)),
    fetchUserBoards: id => dispatch(fetchUserBoards(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PinCreator);
