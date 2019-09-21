import React from "react";
import ProfileHeaderContainer from "./profile_head_container";
import BoardsContainer from "../board/board_container";
import UserPins from "../board/user_pins"
import { withRouter } from "react-router-dom";

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

  componentDidUpdate() {
    this.props.fetchUserByUserName(this.props.match.params.username);
  }

  render() {
    // debugger
    return this.props.user ? (
      <div >
        <ProfileHeaderContainer />
        {this.props.location.pathname.includes("pins") ? <UserPins pins={this.props.pins}/> :
          <BoardsContainer user={this.props.user} />}
      </div>
    ) : (
    <div />
    );
  }
}

export default withRouter(Profile);
