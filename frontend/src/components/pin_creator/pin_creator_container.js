import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import PinCreator from "./pin_creator"
const mapStateToProps = ({ session, entities }) => {
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
  mapDispatchToProps)(PinCreator)