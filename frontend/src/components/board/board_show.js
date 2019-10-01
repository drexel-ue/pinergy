import React, { Component } from "react";
import BoardPinHeader from "./board_profile_container";
import BoardPinItems from "./board_pin_items";
import { withRouter } from "react-router-dom";
class BoardShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [],
    };
  }
  componentDidMount() {
    this.props.fetchBoardPins(this.props.match.params.boardid).then(res => {
      return this.setState({pins: res})
    })
  }

  render() {
    // debugger

    return (
      <div>
        <BoardPinHeader boardId={this.props.match.params.boardid} />
        {/* <BoardPinItems pins={}/> */}
      </div>
    );
  }
}
export default withRouter(BoardShow);
