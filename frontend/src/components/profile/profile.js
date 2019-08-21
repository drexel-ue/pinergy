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

  componentDidMount() {
    this.props.fetchUserByUserName(this.props.match.params.username);
  }

  render() {
    return this.props.user ? (
      <div >
        <ProfileHeaderContainer />
        <BoardsContainer user={this.props.user}/>
      </div>
    ) : (
    <div />
    );
  }
}

export default Profile;
