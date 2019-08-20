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
    switch (this.props.location.pathname) {
      case "/profile/boards":
        return <BoardsContainer />;
      default:
        return <div />;
    }
  }
  render() {
    return (
      <div className="test-dive">
        <ProfileHeaderContainer />
        {this.pickPath()}

        <h2>All of This User's Board</h2>
      </div>
    );
  }
}

export default Profile;
