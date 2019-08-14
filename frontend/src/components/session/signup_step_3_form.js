import React from "react";
import { withRouter } from "react-router-dom";
import "./session.css";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: undefined,
      showInput: false,
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.showInput = this.showInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      gender: this.state.gender
    };

    this.props.updateUsername(user, this.props.user._id);
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
    this.setState({ gender: e.target.value });
  }

  showInput() {
    this.setState({ showInput: true });
  }

  renderInput() {
    return this.state.showInput ? (
      <input
        type="text"
        value={this.state.gender}
        onChange={this.handleInput}
        placeholder={this.props.user.username}
      />
    ) : (
      <div className="gender_option">Custom</div>
    );
  }
  render() {
    return (
      <div className="signup_step_3">
        <div className="welcome">How do you identify?</div>
        <label className="gender_label">
          <input className="gender_option" type="checkbox" />
          Female
        </label>
        <label className="gender_label">
          <input className="gender_option" type="checkbox" />
          Male
        </label>
        <label className="gender_label">
          <input
            className="gender_option"
            type="checkbox"
            onClick={this.showInput}
          />
          {this.renderInput()}
        </label>
        {this.renderErrors()}
      </div>
    );
  }
}

export default withRouter(SignupForm);
