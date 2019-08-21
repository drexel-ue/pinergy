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
    // debugger;
    this.props.fetchUserByUserName(this.props.match.params.username);
  }

//   pickPath() {
//     switch (this.props.location.pathname) {
        
//       case `/${this.props.currentUser.id}/boards`:
        
// //       case "/profile/boards":
//         return <BoardsContainer />;
//       default:
//         return <div />;
//     }
//   }
  render() {
    return this.props.user ? (
      <div className="test-dive">
        <ProfileHeaderContainer />
        {/* {this.pickPath()} */}

        <h2>All of This User's Board</h2>
        <BoardsContainer user={this.props.user}/>
      </div>
    ) : (
    <div />
    );
  }
}

export default Profile;
