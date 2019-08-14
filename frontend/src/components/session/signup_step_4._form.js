import React from "react";
import { withRouter } from "react-router-dom";
import "./session.css";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "English",
      country: "United States",
      errors: {}
    };

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

  render() {
    return (
      <div className="signup_step_4">
        <div className="locale_ask">Pick your language and country</div>
        <div className="locale_select">
          <div className="local_select_text">Language</div>
          <i class="fas fa-chevron-down" />
        </div>
        <div className="locale_select">
          <div className="local_select_text">Country</div>
          <i class="fas fa-chevron-down" />
        </div>
        {this.renderErrors()}
      </div>
    );
  }
}

export default withRouter(SignupForm);
