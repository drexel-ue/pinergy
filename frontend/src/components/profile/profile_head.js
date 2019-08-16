import React from "react";
import { Link } from "react-router-dom";
export default class ProfileHead extends React.Component {
  constructor(props) {
    super(props);
    // debugger
    this.state = {
      showDropdown: false,
      showShareDropdown: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleShareDropdown = this.toggleShareDropdown.bind(this);
  }
  toggleDropdown(e) {
    e.preventDefault();
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  componentDidMount() {
    this.props.fetchCurrentUser(this.props.id);
  }

  toggleShareDropdown(e) {
    e.preventDefault();
    this.setState({ showShareDropdown: !this.state.showShareDropdown });
  }
  renderDropdown() {
    return this.state.showDropdown ? (
      <div className="drpdwnenc">
        <div className="cboard">Create Board</div>
        <div className="Pin">Create Pin</div>
      </div>
    ) : (
      <div />
    );
  }
  renderShareDropdown() {
    return this.state.showShareDropdown ? (
      <div className="sharedrpdwnenc">
        <p className="sharedrpdwnenchdr">Share this profile </p>
        <i className="fab fa-whatsapp des" />
        <i className="fab fa-facebook des" />
        <i className="fab fa-twitter des" />
      </div>
    ) : (
      <div />
    );
  }

  findDisplayName() {
    const user = this.props.currentUser;
    return user.firstName ? `${user.firstName} ${user.lastName} `
      : user.username;
  }
  render() {
    const user = this.props.currentUser;
    return this.props.currentUser ? (
      <div>
        <div>
          <i className="fas fa-plus" onClick={this.toggleDropdown} />
          {this.renderDropdown()}
          <Link to="/profile/settings">
            <i className="fas fa-pen" />
          </Link>
          <i className="fas fa-upload" onClick={this.toggleShareDropdown} />
          {this.renderShareDropdown()}
        </div>
        <div className="dispname">{this.findDisplayName()}</div>
        <div className="follownums">
          {user.followers.length} followers {user.following.length} following
        </div>
        <img src={user.profilPhotoUrl} className="prfprfpho"/>
        <div className="prfnav">
          <Link to="/profile/boards">Baords</Link>
          <Link to="/profile/pins">Pins</Link>
          <Link to="/profile/tries">Tries</Link>
          <Link to="/profile/topics">Topics</Link>
        </div>
      </div>
    ) : (
      <div />
    );
  }
}
