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

    this.props.signup(user);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => {
          return <li key={`error-${i}`}>{this.state.errors[error]}</li>;
        })}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup_step_1">
        <form onSubmit={this.handleSubmit}>
          <div className="signup_step_1_form">
            <br />
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
            <br />
            <input
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              placeholder="Confirm Password"
            />
            <br />
            <input
              type="text"
              value={this.state.age}
              onChange={this.update("age")}
              placeholder="Age"
            />
            <br />
            <button className="redbtn btn_signup_step_1">Continue</button>
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
