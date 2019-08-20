import React from "react";
import "../home/home.css";
import { withRouter } from "react-router-dom";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
  }

  //
  componentDidMount() {
    this.props.fetchUserBoards(this.props.match.params.user_id);
  }

  componentWillReceiveProps(newState) {
    this.setState({ boards: newState.boards });
  }

  // showP(event) {
  //     event.preventDefault();
  //     this.props.showPin(this.props.pin._id);
  // }

  render() {
    debugger;
    if (this.props.boards.length > 0) {
      return (
        <div>
          <div> These are my boards</div>

          <ul>
            {this.props.boards.map(b => (
              <li>{b.title}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>{this.props.currentUser.username} has no boards yet! </div>;
    }
  }
}

export default withRouter(Board);
