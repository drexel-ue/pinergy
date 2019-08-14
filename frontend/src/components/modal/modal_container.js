import React from "react";
import {
  closeModal,
  // OPEN_MODAL,
  // CLOSE_MODAL,
  SHOW_FIRST_SIGN_UP_STEP,
  MOVE_TO_SECOND_SIGN_UP_STEP
} from "../../actions/modal_actions";
import { connect } from "react-redux";
import "./modal.css";
import SignupStep1Container from "../session/signup_step_1_form_container";
import SignupStep2Container from "../session/signup_step_2_form_container";
import { showFirstSignUpStep } from "../../actions/modal_actions";
import SignupStep3Container from "../session/signup_step_3_container";

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.showFirstSignUpStep();
  }

  render() {
    // if (!modal) {
    //   return null;
    // }
    let component;
    switch (this.props.modal) {
      case SHOW_FIRST_SIGN_UP_STEP:
        component = <SignupStep1Container />;
        break;
      case MOVE_TO_SECOND_SIGN_UP_STEP:
        component = <SignupStep2Container />;
        break;
      default:
        return null;
    }
    return (
      <div className="modal-background" onClick={closeModal}>
        <div className="modal-child">
          {/* {component} */}
          <SignupStep3Container />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    showFirstSignUpStep: () => dispatch(showFirstSignUpStep())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
