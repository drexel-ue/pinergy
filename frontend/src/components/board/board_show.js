import React, { Component } from "react";
import BoardPinHeader from "./board_profile_container";
import BoardPinItems from "./board_pin_items";
import { withRouter } from "react-router-dom";
import BoardShowItemContainer from "./board_show_item_container";
import Masonry from "react-masonry-component";
import Loader from "../loader/loader";

const masonryOptions = {
  transitionDuration: 650,
  itemSelector: ".home-pin-wrap",
  columnWidth: 270,
  fitWidth: true
};

class BoardShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [],
      board: ""
    };
  }
  componentWillMount() {
    this.props.fetchBoardPins(this.props.match.params.boardid).then(res => {
      this.setState({ pins: res });
      this.props
        .fetchSingleBoard(this.props.match.params.boardid)
        .then(res2 => {
          this.setState({ board: res2.board });
        });
    });
  }

  render() {
    return this.state.board ? (
      <div>
        <BoardPinHeader
          boardTitle={this.state.board.title}
          board={this.state.board}
          photoUrl={this.props.photoUrl}
        />
        <Masonry
          className="board-masonry"
          elementType="div"
          updateOnEachImageLoad={true}
          options={masonryOptions}
        >
          <div>
            {this.state.pins.map(ele => {
              return <BoardShowItemContainer pin={ele} />;
            })}
          </div>
        </Masonry>
      </div>
    ) : (
      <div />
    );
  }
}
export default withRouter(BoardShow);
