import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import "./session.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this)
    this.renderErrors = this.renderErrors.bind(this);
    this.gotoSignup = this.gotoSignup.bind(this);
  }

  // Once the user has been authenticated, redirect to the Tweets page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/tweets");
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
  }

  handleDemoLogin(e) {
    e.preventDefault();

    let user = {
      email: "DemoUser@Pinergy.com",
      password: "test123"
    };

    this.props.login(user);
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }
  gotoSignup(e) {
    e.preventDefault();
    this.props.gotoSignUp();
  }
  render() {
    return (
      <div className="login-form-container">
        <div className="pinergy-logo">P</div>
          <div className="login-welcome">
            Welcome to Pinergy
          </div>
        <form onSubmit={this.handleSubmit}>
          <div className="login-input">
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
            <Link className="forgot-password" to="">Forgot your password?</Link>
            <br />
            <button className="redbtn login-btn">Log in</button>
            <div className="log-or-dem">OR</div>
            <button className='redbtn demolog' onClick={this.handleDemoLogin}>Demo Login</button>
            <div className="login-terms">By continuing, you agree to Pinergy's</div>
            <div className="login-terms bold">Terms of Service, Privacy Policy</div>
            <div className="login-to-signin" onClick={this.gotoSignup}>Not on Pinergy yet? Sign up</div>
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
