import React from "react";
import ProfileHeaderContainer from './profile_head_container'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    // debugger
    this.state = {
      boards: [],
      sections: []
    };
  }


  render() {
    // debugger 
      return (
        <div>
            <ProfileHeaderContainer/>
          <h2>All of This User's Board</h2>
          {this.state.boards.map(board => (
            <div>To Be a Bardsdsdfsfsd</div>
          ))}
        </div>
      );
    }
  }


export default Profile;
