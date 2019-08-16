import { connect } from "react-redux";
import SignupForm from "./signup_step_2_form";
import { updateUser } from "../../actions/user_actions";
import { moveToThirdSignupStep } from "../../actions/modal_actions";

const mapStateToProps = ({ session, entities, errors }) => {
  return {
    user: entities.users[session.user.id],
    errors: errors.userUpdate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUsername: (username, id) => dispatch(updateUser(username, id)),
    nextStep: () => dispatch(moveToThirdSignupStep())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
