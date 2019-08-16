import { connect } from "react-redux";
import SignupForm from "./signup_step_3_form";
import { updateUser } from "../../actions/user_actions";
import { moveToFourthSignupStep } from "../../actions/modal_actions";

const mapStateToProps = ({ session, entities, errors }) => {
  return {
    user: entities.users[session.user.id],
    errors: errors.userUpdate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateGender: (gender, id) => dispatch(updateUser(gender, id)),
    toNext: () => dispatch(moveToFourthSignupStep())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
