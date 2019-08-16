import React from 'react'
import { Link } from 'react-router-dom'
export default class ProfileHead extends React.Component{ 
  constructor(props) {
    super(props);
    debugger
    this.state = {
      showDropdown: false,
      showShareDropdown: false
    }
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleShareDropdown = this.toggleShareDropdown.bind(this);
  }
  toggleDropdown(e) {
    e.preventDefault();
    this.setState({showDropdown: !this.state.showDropdown})
  }
  toggleShareDropdown(e) {
    e.preventDefault();
    this.setState({ showShareDropdown: !this.state.showShareDropdown })
  }
  renderDropdown() {
    return this.state.showDropdown ? (
      <div className="drpdwnenc">
        <div className="cboard">Create Board</div>
        <div className="Pin">Create Pin</div>
      </div>
    ) : ( <div></div>)
  }
  renderShareDropdown() {
    return this.state.showShareDropdown ? (
      <div className="sharedrpdwnenc">
        <p className="sharedrpdwnenchdr">Share this profile </p>
        <i className="fab fa-whatsapp des"></i>
        <i className="fab fa-facebook des"></i>
        <i className="fab fa-twitter des"></i>
      </div>
    ) : (<div></div>)
  }
  render() {
    return ( 
      <div>
        <div>
          <i className="fas fa-plus" onClick={this.toggleDropdown}></i>
          {this.renderDropdown()}
          <Link to='/profile/settings'><i className="fas fa-pen" /></Link>
          <i className="fas fa-upload" onClick={this.toggleShareDropdown}></i>
          {this.renderShareDropdown()}
        </div>
        <div></div>
      </div>
    )
  }
}