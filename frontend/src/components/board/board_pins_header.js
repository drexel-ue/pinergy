import React, { Component } from "react";

export default class board_pins_header extends Component {


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

  render() {
    const user = this.props.user;
    const basePath = `/profile/${this.props.currentUser.username}`;
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
            <div id="username-scroll" className="username-animate hide">
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
                <div className="message-follow-buttons">
                  {this.showMessage()}
                  {this.showFollow()}
                </div>
                <img src={user.profilePhotoUrl} className="prfprfpho" />
              </div>
            </div>
            <div className="prfnavv2">
              <div className="prfnavv2lft">
                <Link className="links" to={`${basePath}/boards`}>
                  Boards
                </Link>
                <Link className="links" to={`${basePath}/pins`}>
                  Pins
                </Link>
                {/* <Link className="links" to="`${basePath}/tries">
                  Tries
                </Link>
                <Link className="links" to="`${basePath}/topics">
                  Topics
                </Link> */}
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
