import { connect } from "react-redux";
import SignupForm from "./signup_step_4_form";
import { updateUser } from "../../actions/user_actions";
import { moveToFifthSignupStep } from "../../actions/modal_actions";

const mapStateToProps = ({ session, entities, errors }) => {
  return {
    user: entities.users[session.user.id],
    errors: errors.userUpdate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLocale: (locale, id) => dispatch(updateUser(locale, id)),
    toNext: () => dispatch(moveToFifthSignupStep())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
