import { connect } from "react-redux";
import SignupForm from "./signup_step_1_form";
import { signup } from "../../actions/session_actions";

const mapStateToProps = state => {
  return {
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: userData => dispatch(signup(userData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
