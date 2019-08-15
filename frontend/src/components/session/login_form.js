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
        Welcome to Pinterest
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="login-input">
            <input
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <Link to="">Forgot your password?</Link>
            <br />
            <button className="redbtn login">Log in</button>
            {this.renderErrors()}
            Or 
            <button className='redbtn demolog'></button>
            <div onClick={this.gotoSignup}>Not on Pinterest yet? Sign up</div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
