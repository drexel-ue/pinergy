import React from "react";
import { MOVE_TO_LOGIN } from "../../actions/modal_actions";
class SessionButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.props.modal === MOVE_TO_LOGIN
      ? this.props.showFirstSignUpStep()
      : this.props.showLogin();
  }

  render() {
    const text = this.props.modal !== MOVE_TO_LOGIN ? "Log In" : "Sign Up";
    const className = this.props.hide ? "sxybutton hide" : "sxybutton";
    return (
      <button className={className} onClick={this.handleClick}>
        {text}
      </button>
    );
  }
}

export default SessionButton;
