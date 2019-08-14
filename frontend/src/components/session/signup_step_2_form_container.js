import { connect } from "react-redux";
import SignupForm from "./signup_step_2_form";
import { updateUser } from "../../actions/user_actions";

const mapStateToProps = ({ session, errors }) => {
  return {
    user: session.user,
    errors: errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUsername: username => dispatch(updateUser(username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
