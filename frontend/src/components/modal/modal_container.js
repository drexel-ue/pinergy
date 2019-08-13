import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import "./modal.css";
import SignupStep1Container from "../session/signup_step_1_form_container";

function Modal({ modal, closeModal }) {
  //   if (!modal) {
  //     return null;
  //   }
  //   let component;
  //   switch (modal.type) {
  //     case "photoShow":
  //       component = <PostShowContainer data={modal.data} />;
  //       break;
  //     case "commentError":
  //       component = <CommentErrorModal />;
  //       break;
  //     default:
  //       return null;
  //   }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child">
        <SignupStep1Container/>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
