import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./profile.css";



class ProfileHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      showShareDropdown: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleShareDropdown = this.toggleShareDropdown.bind(this);
    this.myScrollFunc = this.myScrollFunc.bind(this)
  }
  toggleDropdown(e) {
    e.preventDefault();
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  componentDidMount() {
    this.props.fetchUserByUserName(this.props.match.params.username);
    window.addEventListener("scroll", this.myScrollFunc);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.myScrollFunc);
  }

  myScrollFunc() {
    let scrollY = window.scrollY;
    let usernameScroll = document.getElementById("username-scroll");
    if (scrollY  >= 145) {
      usernameScroll.className = "username-animate show"
    } else {
      usernameScroll.className = "username-animate hide"
    }
  };
  
  toggleShareDropdown(e) {
    e.preventDefault();
    this.setState({ showShareDropdown: !this.state.showShareDropdown });
  }
  
  renderDropdown() {
    return this.state.showDropdown ? (
      <div className="drpdwnenc create-dropdown">
        <div className="create-btn">Create Board</div>
        <div className="create-btn">
          <Link className="profile-head-link" to="/pin_creator">
            Create Pin
          </Link>
        </div>
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
    const user = this.props.user;
    return user.firstName
      ? `${user.firstName} ${user.lastName} `
      : user.username;
  }

  showMessageFollow() {
    return this.props.user._id != this.props.id ? (
      <div className="message_and_follow_buttons">
        <button className="message_button">Message</button>
        <button className="follow_button redbtn">Following</button>
      </div>
    ) : (
      <div />
    );
  }

  render() {
    const user = this.props.user;
    return this.props.user ? (
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
            <div 
              id="username-scroll"
              className="username-animate hide">
              {this.props.user.username}
            </div>
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
              <div className="message_follow_image">
                {this.showMessageFollow()}
                <img src={user.profilePhotoUrl} className="prfprfpho" />
              </div>
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

export default withRouter(ProfileHead);
