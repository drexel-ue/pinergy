import React from "react";
import { withRouter } from "react-router-dom";
import "./session.css";
import "./status-bar.css";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      errors: {},
      showInput: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      username: this.state.username
    };

    if (this.state.username) {
      this.props.updateUsername(user, this.props.user._id);
    }
    this.props.nextStep();
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  toggleInput(e) {
    e.preventDefault();
    this.setState({ showInput: !this.state.showInput });
  }

  renderInput() {
    return this.state.showInput ? (
      <input
        className="step2-input"
        type="text"
        value={this.state.username}
        onChange={this.handleInput}
        placeholder={this.props.user.username}
      />
    ) : (
      <div className="username">{this.props.user.username}</div>
    );
  }
  render() {
    return (
      <div className="signup_step_2">
        <div className="signup-status-container">
          <div className="sign-status-bar">
            <div className="red-circle"></div>
            <div className="black-circle"></div>
            <div className="black-circle"></div>
            <div className="black-circle"></div>
          </div>

        </div>
        <img className="pfimg" src={this.props.user.profilePhotoUrl} />

        <div className="sup2email">{this.props.user.email}</div>

        <div className="welcome">Welcome to Pinergy,</div>
        <div className="sub2msgenc">
          {this.renderInput()}
          <i className="fas fa-pen" onClick={this.toggleInput} />
        </div>

        <div className="txt3">
          Your answers to the next questions will help us find the right ideas
          for you
        </div>
        <button className="redbtn btn_signup_step2" onClick={this.handleSubmit}>
          Next
        </button>
        {this.renderErrors()}
      </div>
    );
  }
}

export default withRouter(SignupForm);
