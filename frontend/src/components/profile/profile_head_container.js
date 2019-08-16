import { connect } from "react-redux";
import ProfileHead from "./profile_head";
import { fetchUser } from "../../actions/user_actions";

const mapStateToProps = ({ session, entities}) => {

  return {
    currentUser: entities.users[session.user.id],
    id: session.user.id 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: (id) => dispatch(fetchUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileHead);
