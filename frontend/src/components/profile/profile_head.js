import React from "react";
import { Link } from "react-router-dom";
import "./profile.css";
export default class ProfileHead extends React.Component {
  constructor(props) {
    super(props);
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
      <div className="drpdwnenc create-dropdown">
        <div className="create-btn">Create Board</div>
        <div className="create-btn"><Link className="profile-head-link" to="/pin_creator">Create Pin</Link></div>
      </div>
    ) : (
      <div />
    );
  }
  renderShareDropdown() {
    return this.state.showShareDropdown ? (
      <div className="sharedrpdwnenc">
        <div className="social-icon-wrap">
          <div className="social-icon-text">
            <p className="sharedrpdwnenchdr">Share this profile </p>
          </div>
          <div className="social-icons">
            <i className="fab fa-whatsapp des" />
            <i className="fab fa-facebook des" />
            <i className="fab fa-twitter des" />
          </div>
        </div>
      </div>
    ) : (
      <div />
    );
  }

  findDisplayName() {
    const user = this.props.currentUser;
    return user.firstName
      ? `${user.firstName} ${user.lastName} `
      : user.username;
  }
  render() {
    const user = this.props.currentUser;
    return this.props.currentUser ? (
      <div>
        <div className="prfnav">
          <div className="prftopnav">
            <i className="fas fa-plus" onClick={this.toggleDropdown} />
            {this.renderDropdown()}
            <Link className="profile-head-link" to="/profile/settings">
              <i className="fas fa-pencil-alt prficon" />
            </Link>
            <i className="fas fa-upload" onClick={this.toggleShareDropdown} />
            {this.renderShareDropdown()}
          </div>
        </div>
        <div className="prfbox">
          <div className="prfinnerbox">
            <div className="prfsmlbox">
              <div className="nnfbox">
                <div className="dispname">{this.findDisplayName()}</div>
                <div className="follownums">
                  {user.followers.length} followers {user.following.length}{" "}
                  following
                </div>
              </div>
              <img src={user.profilePhotoUrl} className="prfprfpho" />
            </div>
            <div className="prfnavv2">
              <div className="prfnavv2lft">
                <Link className="links" to="/profile/boards">
                  Boards
                </Link>
                <Link className="links" to="/profile/pins">
                  Pins
                </Link>
                <Link className="links" to="/profile/tries">
                  Tries
                </Link>
                <Link className="links" to="/profile/topics">
                  Topics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div />
    );
  }
}
