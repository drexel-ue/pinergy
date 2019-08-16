import React from "react";
import ProfileHeader from './profile_head'

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
      sections: []
    };
  }

  componentWillMount() {
    console.log(this.props.currentUser.id);
    // Fetch boards, sections, and pins here.
  }

  componentWillReceiveProps(newState) {
    // Set state here.
  }

  render() {
    debugger 
      return (
        <div>
            <ProfileHeader/>
          <h2>All of This User's Board</h2>
          {this.state.boards.map(board => (
            <div>To Be a Bard</div>
          ))}
        </div>
      );
    }
  }


export default Profile;
