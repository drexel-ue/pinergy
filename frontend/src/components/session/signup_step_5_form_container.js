import { connect } from "react-redux";
import SignupForm from "./signup_step_5_form";
import { updateUser } from "../../actions/user_actions";

const mapStateToProps = ({ session, errors }) => {
  return {
    user: session.user,
    errors: errors.userUpdate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateInterests: (interests, id) => dispatch(updateUser(interests, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
