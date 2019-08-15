import React from 'react'
import { MOVE_TO_LOGIN } from '../../actions/modal_actions'
class SessionButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    e.preventDefault();  
    // debugger 
    this.props.modal === MOVE_TO_LOGIN ?
      this.props.showFirstSignUpStep() : this.props.showLogin()
  }
  

  render() {
    const text = this.props.modal !== MOVE_TO_LOGIN ? "Log In" : "Sign Up"
    return (
      <button onClick={this.handleClick}>{text}</button>
    )
    
  }
}

export default SessionButton