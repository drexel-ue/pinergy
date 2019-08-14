import React from "react";
import { withRouter } from "react-router-dom";
import "./session.css";
import interests from "../../util/interest_util";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: [],
      errors: {}
    };

    this.selectInterest = this.selectInterest.bind(this);
    this.updateInterests = this.updateInterests.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
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

  selectInterest(interest) {
    return event => {
      event.preventDefault();
      event.stopPropagation();
      const interests = this.state.interests.includes(interest)
        ? this.state.interests.filter(inArr => inArr !== interest)
        : [...this.state.interests, interest];
      this.setState({ interests });
      document.getElementById(interest).classList.toggle("selected_interest");
    };
  }

  updateInterests(event) {
    event.preventDefault();
    const interests = {
      interests: this.state.interests
    };
    this.props.updateInterests(interests, this.props.user._id);
  }

  renderButtonText() {
    return this.state.interests.length < 5
      ? `Pick ${5 - this.state.interests.length} more`
      : "Done";
  }

  buttonStyling() {
    return {
      background: this.state.interests.length < 5 ? "#efefef" : "red",
      color: this.state.interests.length < 5 ? "#8e8e8e" : "white"
    };
  }

  render() {
    return (
      <div className="signup_step_5">
        <div className="last_step">Last Step! Tell us what you're into!</div>
        <div className="interests">
          {interests.map((interest, index) => (
            <div
              id={interest}
              key={index}
              className="interest"
              onClick={this.selectInterest(interest)}
            >
              <div className="interest_text">{interest}</div>
            </div>
          ))}
        </div>
        <button
          className="redbtn btn_signup_step_5"
          style={this.buttonStyling()}
        >
          {this.renderButtonText()}
        </button>
        {this.renderErrors()}
      </div>
    );
  }
}

export default withRouter(SignupForm);
