import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BoardShow from "./board_show";
// import { fetchUserBoards } from "../../actions/board_actions";
import { fetchBoardPins } from "../../actions/pin_actions"
import { fetchUserBoards} from "../../actions/board_actions"

const msp = ({ session }, ownProps) => {
  // debugger

  return {
    userId: session.user.id

  };
};

const mdp = dispatch => {
  return {
    fetchBoardPins: board_id => dispatch(fetchBoardPins(board_id))
  };
};

export default withRouter(
  connect(
    msp,
    mdp
  )(BoardShow)
);
