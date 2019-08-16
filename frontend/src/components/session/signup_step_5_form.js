import React from "react";
import { withRouter } from "react-router-dom";
import "./session.css";
import "./status-bar.css";
import interests from "../../util/interest_util";
import InterestContainer from "../interest/interest_container";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: [],
      errors: {},
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
      document
        .getElementById(`${interest}_img`)
        .classList.toggle("selected-interest-div")
    }
  };

  updateInterests(event) {
    event.preventDefault();
    if (this.state.interests.length > 4) {
      const interests = {
        interests: this.state.interests
      };
      this.props.updateInterests(interests, this.props.user._id)
        .then(() => this.props.closeModal());
    }
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
    const urlKeysArray = Object.keys(interests)
    const urlValuesArray = Object.values(interests)
    return (
      <div className="signup_step_5">
        <div className="signup-status-container">
          <div className="sign-status-bar">
            <div className="red-circle"></div>
            <div className="red-circle"></div>
            <div className="red-circle"></div>
            <div className="red-circle"></div>
            </div>
          </div>
        <div className="last_step">Last Step! Tell us what you're into!</div>
        <div className="interests">
          {urlKeysArray.map((interest, index) => (
            <div key={`${interest}_div`}onClick={this.selectInterest(interest)}>
              <InterestContainer interest={interest} url={urlValuesArray[index]} key={index} />
            </div>
          ))}
        </div>
        <div className="signup-fading"></div>
        <button
          className="redbtn btn_signup_step_5"
          style={this.buttonStyling()}
          onClick={this.updateInterests}
        >
          {this.renderButtonText()}
        </button>
        {this.renderErrors()}
      </div>
    );
  }
}

export default withRouter(SignupForm);
