import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProfileHead from "./profile_head";
import { fetchUser } from "../../actions/user_actions";

const mapStateToProps = ({ session, entities }, ownProps) => {
  debugger;
  return {
    currentUser: entities.users[session.user.id],
    user: Object.values(entities.users).find(
      user => user.username == ownProps.match.params.username
    ),
    id: session.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfileHead)
);
