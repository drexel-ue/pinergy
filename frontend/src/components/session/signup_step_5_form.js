import React from "react";
import { withRouter } from "react-router-dom";
import "./session.css";
import languages from "../../util/language_util";
import countries from "../../util/country_util";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interests = [],
      errors: {}
    };

    
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

  selectInterest(interest, key) {
    return event => {
      event.preventDefault();
      event.stopPropagation();
      const interests = [...this.state.interests, interest]
      this.setState({ interests});
    };
  }

  updateInterests(event) {
    event.preventDefault();
    const interests = {
     interests:this.state.interests
    };
    this.props.updateInterests(interests, this.props.user._id);
  }

  render() {
    return (
      <div className="signup_step_5">
        
        <button className="redbtn btn_signup_step_5">Next</button>
        {this.renderErrors()}
      </div>
    );
  }
}

export default withRouter(SignupForm);
