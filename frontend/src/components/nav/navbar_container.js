import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

import NavBar from "./navbar";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  user: (state.session.isAuthenticated ? state.entities.users[state.session.user.id] : null)
});

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
