import React from "react";
import {
  closeModal,
  SHOW_FIRST_SIGN_UP_STEP,
  MOVE_TO_SECOND_SIGN_UP_STEP,
  MOVE_TO_THIRD_SIGN_UP_STEP,
  MOVE_TO_FOURTH_SIGN_UP_STEP,
  MOVE_TO_FIFTH_SIGN_UP_STEP,
  MOVE_TO_LOGIN,
  CLOSE_MODAL,
  SHOW_PIN
} from "../../actions/modal_actions";
import { connect } from "react-redux";
import "./modal.css";
import { showFirstSignUpStep } from "../../actions/modal_actions";
import SignupStep1Container from "../session/signup_step_1_form_container";
import SignupStep2Container from "../session/signup_step_2_form_container";
import SignupStep3Container from "../session/signup_step_3_form_container";
import SignupStep4Container from "../session/signup_step_4_form_container";
import SignupStep5Container from "../session/signup_step_5_form_container";
import LoginFormContainer from "../session/login_form_container";
import SessionButtonContainer from "../session/session_button_container";
import PinShowContainer from "../show/pin_show_container";
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.dismissModal = this.dismissModal.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser.interests || this.props.currentUser.id) {
      this.props.closeModal();
    } else {
      this.props.showFirstSignUpStep();
    }
  }

  dismissModal(event) {
    event.preventDefault();
    if ([SHOW_PIN].includes(this.props.modal)) {
      this.props.closeModal();
    }
  }

  render() {
    let component;
    switch (this.props.modal) {
      case SHOW_FIRST_SIGN_UP_STEP:
        component = <SignupStep1Container />;
        break;
      case MOVE_TO_SECOND_SIGN_UP_STEP:
        component = <SignupStep2Container />;
        break;
      case MOVE_TO_THIRD_SIGN_UP_STEP:
        component = <SignupStep3Container />;
        break;
      case MOVE_TO_FOURTH_SIGN_UP_STEP:
        component = <SignupStep4Container />;
        break;
      case MOVE_TO_FIFTH_SIGN_UP_STEP:
        component = <SignupStep5Container />;
        break;
      case MOVE_TO_LOGIN:
        component = <LoginFormContainer />;
        break;
      case SHOW_PIN:
        component = <PinShowContainer />;
        break;
      case CLOSE_MODAL:
        return (component = <div />);
      default:
        return (component = <div />);
    }

    const modalChildStyle = this.props.modal === "SHOW_PIN" ? {
      top: "55%",
      bottom: "45%",
      height: "90%",
      width: "75%"
    } : {}
    return (
      <div className="modal-background" 
          onClick={this.dismissModal}>
        <div 
          className="modal-child"
          style={modalChildStyle}>
          {component}
        </div>
        <SessionButtonContainer modal={this.props.modal} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal.action,
    currentUser: state.session.user,
    isAuthenticated: state.session.isAuthenticated
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
