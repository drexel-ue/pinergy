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
    this.copy = this.copy.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleShareDropdown = this.toggleShareDropdown.bind(this);
    this.myScrollFunc = this.myScrollFunc.bind(this);
  }
  toggleDropdown(e) {
    e.preventDefault();
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  componentDidMount() {
    if (this.props.type === "profile") {
      this.props.fetchUserByUserName(this.props.match.params.username);
      window.addEventListener("scroll", this.myScrollFunc);
    }
  }

  componentWillUnmount() {
    if (this.props.type === "profile") {
      window.removeEventListener("scroll", this.myScrollFunc);
    }
  }

  myScrollFunc() {
    let scrollY = window.scrollY;
    let usernameScroll = document.getElementById("username-scroll");
    if (scrollY >= 145) {
      usernameScroll.className = "username-animate show";
    } else {
      usernameScroll.className = "username-animate hide";
    }
  }

  toggleShareDropdown(e) {
    e.preventDefault();
    this.setState({ showShareDropdown: !this.state.showShareDropdown });
  }

  renderDropdown() {
    return this.state.showDropdown ? (
      <div className="drpdwnenc create-dropdown">
        <div className="create-btn">
          <Link className="profile-head-link" to="/pin-creator">
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
            <a 
              rel="noopener noreferrer"
              onClick={this.copy}
              target="_blank" 
              href="https://www.whatsapp.com/">
                <i className="fab fa-whatsapp des" />
            </a>
            <a 
              rel="noopener noreferrer"
              onClick={this.copy}
              target="_blank" 
              href="https://www.facebook.com/">
                <i className="fab fa-facebook des" />
              </a>
            <a 
              rel="noopener noreferrer"
              onClick={this.copy}
              target="_blank" 
              href="https://twitter.com">
                <i className="fab fa-twitter des" />
            </a>
          </div>
        </div>
      </div>
    ) : (
      <div />
    );
  }

  findDisplayName() {
    if(this.props.type === "profile") {
    const user = this.props.user;
    return user.firstName
      ? `${user.firstName} ${user.lastName} `
      : user.username;
    } else {
      return this.props.boardTitle
    }
  }

  showMessage() {
    return this.props.user._id !== this.props.id ? (
      <div className="message_and_follow_buttons">
        <button className="message_button">Message</button>
      </div>
    ) : (
      <div />
    );
  }

  handleFollow(e) {
    e.preventDefault();
    this.props.followUser(this.props.currentUser._id, this.props.user._id);
  }

  renderNav() {
    let basePath = "";
    if (this.props.type === "profile")
      basePath = `/profile/${this.props.currentUser.username}`;

    return this.props.type === "profile" ? (
      <div className="prfnavv2">
        <div className="prfnavv2lft">
          <Link className="links" to={`${basePath}/boards`}>
            Boards
          </Link>
        </div>
      </div>
    ) : (
      <div className="prfnavv2">
        <div className="prfnavv2lft">
        </div>
      </div>
    );
  }

  showFollow() {
    if (this.props.user._id !== this.props.id) {
      if (this.props.currentUser.following.includes(this.props.user._id)) {
        return (
          <div className="message_and_follow_buttons">
            <button
              onClick={this.handleFollow}
              className="follow_button is-following"
            >
              Following
            </button>
          </div>
        );
      } else {
        return (
          <button
            onClick={this.handleFollow}
            className="follow_button not-following"
          >
            Follow
          </button>
        );
      }
    }
  }
  renderFollows() {
    let ele = (this.props.type === "profile"
      ? this.props.user
      : this.props.board);

    return (this.props.type === "profile" ? (
      <div className="follownums">
        {ele.followers.length} followers {ele.following.length} following
      </div>
    ) : (
      <div className="follownums">{ele.pins.length} pins</div>
    ));
  }

  copy(event) {
    navigator.clipboard.writeText(window.location.href);
    window.alert("URL copied to clipboard")
  }

  render() {
    const displayName = this.findDisplayName()
    const url = this.props.type === "profile" ? this.props.user.profilePhotoUrl : this.props.photoUrl
    return (this.props.user || this.props.boardTitle) ? (
      <div>
        <div className="prfnav">
          <div className="prftopnav">
            <i className="fas fa-plus" onClick={this.toggleDropdown} />
            {this.renderDropdown()}
            <i className="fas fa-upload" onClick={this.toggleShareDropdown} />
            {this.renderShareDropdown()}
            <div id="username-scroll" className="username-animate hide">
              {displayName}
            </div>
          </div>
        </div>
        <div className="prfbox">
          <div className="prfinnerbox">
            <div className="prfsmlbox">
              <div className="nnfbox">
                <div className="dispname">{displayName}</div>
                {this.renderFollows()}
              </div>
              <div className="message_follow_image">
                <div className="message-follow-buttons">
                  {this.props.type === "profile" ? this.showMessage() : <div/>}
                  {this.props.type === "profile" ? this.showFollow() : <div/>}
                </div>
                <img alt="" src={url} className="prfprfpho" />
              </div>
            </div>
            {this.renderNav()}
          </div>
        </div>
      </div>
    ) : (
      <div />
    );
  }
}

export default withRouter(ProfileHead);
