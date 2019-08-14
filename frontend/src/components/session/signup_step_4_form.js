import React from "react";
import { withRouter } from "react-router-dom";
import "./session.css";
import languages from "../../util/language_util";
import countries from "../../util/country_util";

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

  toggleDropdown(className) {
    return event => {
      console.log("sslinlkns");
      event.preventDefault();
      event.stopPropagation();
      document.getElementsByClassName(className)[0].classList.toggle("hide");
    };
  }

  render() {
    return (
      <div className="signup_step_4">
        <div className="locale_ask">Pick your language and country</div>
        <div
          onClick={this.toggleDropdown("languages")}
          className="locale_select"
        >
          <div className="local_select_text">Language</div>
          <i className="fas fa-chevron-down" />
          <div className="languages hide">
            {languages.map(lang => (
              <div key={lang} onClick={this.toggleDropdown("languages")}>
                {lang}
              </div>
            ))}
          </div>
        </div>
        <div
          onClick={this.toggleDropdown("countries")}
          className="locale_select"
        >
          <div className="local_select_text">Country</div>
          <i className="fas fa-chevron-down" />
          <div className="countries hide">
            {countries.map(country => (
              <div key={country} onClick={this.toggleDropdown("countries")}>
                {country}
              </div>
            ))}
          </div>
        </div>
        {this.renderErrors()}
      </div>
    );
  }
}

export default withRouter(SignupForm);
