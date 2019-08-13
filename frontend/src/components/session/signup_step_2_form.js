import React from "react";
import { withRouter } from "react-router-dom";
import "../modal/modal.css";
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: "",
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
    return (
      <div className="signup_step_1">
        <form onSubmit={this.handleSubmit}>
          
            {this.renderErrors()}
      
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
