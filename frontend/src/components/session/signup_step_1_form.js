import React from "react";
import { withRouter } from "react-router-dom";
import "./session.css";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      age: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.gotoLogIn = this.gotoLogIn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      age: this.state.age
    };

    this.props.signup(user)
      .then(this.props.history.push('/home'));;
  }
  gotoLogIn(e) {
    e.preventDefault();
    this.props.gotoLogIn();
  }

  renderErrors() {
    return (
      <ul className="signup-errors">
        {Object.keys(this.state.errors).map((error, i) => {
          return <li key={`error-${i}`}>{this.state.errors[error]}</li>;
        })}
      </ul>
    );
  }

  render() {
    return (
    <div>
        <div className="signup_step_1">
          <div className="pinergy-logo logo-s1">P</div>
          <div className="login-welcome">
            Welcome to Pinergy
          </div>
          <div className="ideas-text">
            Find new ideas to try
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="signup_step_1_form">
              <input
                className="login-input-text"
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <input
                className="login-input-text"
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
              />
              <input
                className="login-input-text"
                type="password"
                value={this.state.password2}
                onChange={this.update("password2")}
                placeholder="Confirm Password"
              />
              <input
                className="login-input-text"
                type="text"
                value={this.state.age}
                onChange={this.update("age")}
                placeholder="Age"
              />
              <button className="redbtn signup-btn" onClick={this.handleSubmit}>Continue</button>
              <div className="login-terms">By continuing, you agree to Pinergy's</div>
              <div className="login-terms bold">Terms of Service, Privacy Policy</div>
              <div className="login-to-signin" onClick={this.gotoLogIn}>Already a member? Log in</div>
            </div>
          </form>
        </div>
        {this.renderErrors()}
      </div>
    );
  }
}

export default withRouter(SignupForm);
