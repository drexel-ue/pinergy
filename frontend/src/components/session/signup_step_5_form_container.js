import { connect } from "react-redux";
import SignupForm from "./signup_step_5_form";
import { updateUser } from "../../actions/user_actions";
import { closeModal } from "../../actions/modal_actions";

const mapStateToProps = ({ session, errors }) => {
  return {
    user: session.user,
    errors: errors.userUpdate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateInterests: (interests, id) => dispatch(updateUser(interests, id)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
