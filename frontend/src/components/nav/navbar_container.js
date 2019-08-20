import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { fetchUser, peopleSearch } from "../../actions/user_actions";

import NavBar from "./navbar";

const mapStateToProps = ({ session, entities }) => ({
  loggedIn: session.isAuthenticated,
  user: session.isAuthenticated ? entities.users[session.user.id] : {},
  users: Object.values(entities.users),
  userId: session.isAuthenticated ? session.user.id : ""
});

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: id => dispatch(fetchUser(id)),
    logout: () => dispatch(logout()),
    searchUsers: (users, queryString) =>
      dispatch(peopleSearch(users, queryString))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
