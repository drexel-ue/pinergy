import React from "react";
import ProfileHeaderContainer from "./profile_head_container";
import BoardsContainer from "../board/board_container";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      sections: []
    };
  }

  pickPath() {
    debugger;
    switch (this.props.location.pathname) {
      case `/${this.props.currentUser.id}/boards`:
        return <BoardsContainer />;
      default:
        return <div />;
    }
  }
  render() {
    return (
      <div>
        <ProfileHeaderContainer />
        {/* {this.pickPath()} */}

        <h2>All of This User's Board</h2>
        <BoardsContainer />
      </div>
    );
  }
}

export default Profile;
