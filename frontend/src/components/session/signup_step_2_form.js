import React from "react";
import { withRouter } from "react-router-dom";
import "./session.css";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/login");
    }

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
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history);
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
    // debugger;
    return (
      <div className="signup_step_2">
        <img className="pfimg" src={this.props.user.profilePhotoUrl} />

        <div className="sup2email">{this.props.user.email}</div>

        <div className="welcome">Welcome to Pinergy,</div>
        <div className="2ndmsgenc">
          <div className="username">{this.props.user.username}</div>
          <i className="fas fa-pen" />
        </div>

        <div className="txt3">
          Your answers to the next questions will help us find the right ideas
          for you
        </div>
        <button className="redbtn btn2">Next</button>
      </div>
    );
  }
}

export default withRouter(SignupForm);
