import { connect } from "react-redux";
import Profile from "./profile";
import { withRouter } from "react-router-dom";
import { fetchUserByUserName } from "../../actions/user_actions";

const mapStateToProps = ({ entities, session }, ownProps) => {
  return {
    user: Object.values(entities.users).find(
      user => user.username == ownProps.match.params.username
    ),
    currentUser: session.user,
    entities: entities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserByUserName: username => dispatch(fetchUserByUserName(username))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
);

