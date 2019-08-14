import { connect } from "react-redux";
import SignupForm from "./signup_step_3_form";
import { updateUser } from "../../actions/user_actions";

const mapStateToProps = ({ session, errors }) => {
  return {
    user: session.user,
    errors: errors.userUpdate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateGender: (gender, id) => dispatch(updateUser(gender, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
