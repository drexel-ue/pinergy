import React from "react";
import { withRouter } from "react-router-dom";
import "./user_search_result.css";

class UserSearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;

    this.goToUserProfile = this.goToUserProfile.bind(this)
  }

  renderName() {
    return (
      <div className="search_result_real_name">
        {this.user.firstName || undefined} {this.user.lastName || undefined}
      </div>
    );
  }

  renderLast() {
    return this.user.lastName ? (
      <div className="search_result_real_name">{this.user.lastName}</div>
    ) : (
      <div />
    );
  }

  goToUserProfile() {
    this.props.history.push(`/profile/${this.props.user.username}`)
  }

  render() {
    return (
      <div 
        className="user_search_result"
        onClick={this.goToUserProfile}
      >
        <img
          src={this.user.profilePhotoUrl}
          alt="prof_Photo"
          className="user_search_result_photo"
        />
        <div className="written_info">
          {this.renderName()}
          <div className="search_result_username">{this.user.username}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserSearchResult);
