import { connect } from "react-redux";
import SignupForm from "./signup_step_1_form";
import { signup, login } from "../../actions/session_actions";
import { moveToLogIn } from "../../actions/modal_actions";

const mapStateToProps = state => {
  return {
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user)),
    signup: userData => dispatch(signup(userData)),
    gotoLogIn: () => dispatch(moveToLogIn())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
