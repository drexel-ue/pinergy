import React from "react";
import "./user_search_result.css";

export default class UserSearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
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

  render() {
    return (
      <div className="user_search_result">
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
