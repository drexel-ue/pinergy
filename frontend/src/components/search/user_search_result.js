import React from "react";

export default class UserSearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
  }

  render() {
    return (
      <div classNam="user_search_result">
        <div>{this.user.username}</div>
      </div>
    );
  }
}
