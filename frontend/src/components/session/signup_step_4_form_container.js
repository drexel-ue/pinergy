import { connect } from "react-redux";
import SignupForm from "./signup_step_4_form";
import { updateUser } from "../../actions/user_actions";

const mapStateToProps = ({ session, errors }) => {
  return {
    user: session.user,
    errors: errors.userUpdate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLocale: (locale, id) => dispatch(updateUser(locale, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
