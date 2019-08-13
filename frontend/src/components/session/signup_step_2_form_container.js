import { connect } from "react-redux";
import SignupForm from "./signup_step_2_form";

const mapStateToProps = ({ session, errors }) => {
  return {
    user: session.user,
    errors: errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
