import React from "react";
import "../home/home.css";
import { withRouter } from "react-router-dom";
import "./board.css"
import BoardItemContainer from "./board_item_container"


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
  }

  /////
  componentDidMount() {
    if (this.props.user) {
      this.props.fetchUserBoards(this.props.user._id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.fetchUserBoards(this.props.user._id)
    }
  }

  componentWillReceiveProps(newState) {
    this.setState({ boards: newState.boards });
  }

  render() {
    if (this.props.boards.length > 0) {
      return (
        <div className="profile-boards-cover">
            {this.props.boards.map(b => (
              <BoardItemContainer key={b._id} board={b} boardId={b._id} />
            ))}
        </div>
      );
    } else {
      return <div className="user-no-boards"> {this.props.user.username} has no boards yet! </div>;
    }

  }
}

export default withRouter(Board);
