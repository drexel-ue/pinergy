import React from "react";
import "../home/home.css";
import { withRouter } from "react-router-dom";
import "./board.css";

class BoardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [],
      numOfPins: this.props.board.pins.length
    };
  }

    componentDidMount() {
        this.props.fetchBoardPreviews(this.props.boardId).then(res => {
        this.setState({ pins: res });
    });
  }

  render() {
    const { numOfPins, pins } = this.state;
    return (
      <div className="board-item-wrap">
        <div className="board-item-top">
            {pins.map((ele, idx) => {
              const classIndicator = pins.length;
              return (
                <img
                  src={ele.url}
                  key={idx}
                  className={`board-pin-section`}
                />
              );
            })}
        </div>
        <div className="board-item-bottom">
          <div className="board-item-title">{this.props.board.title} </div>
          <div className="board-item-stats"> {numOfPins}</div>
        </div>
      </div>
    );
  }
}


export default withRouter(BoardItem);
