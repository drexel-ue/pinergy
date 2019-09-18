import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import { createPins } from "../../actions/pin_actions";
import { fetchUserBoards } from "../../actions/board_actions";

import Scrape from "./scrape";


const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: id => dispatch(fetchUser(id)),
    createPins: data => dispatch(createPins(data)),
    fetchUserBoards: id => dispatch(fetchUserBoards(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Scrape);
