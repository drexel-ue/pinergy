import React from "react";
import "../home/home.css";
import { withRouter } from "react-router-dom";
import "./board.css"
import { Link } from "react-router-dom";



class BoardItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pins: [],
            numOfPins: this.props.board.pins.length
        };

        this.firstPins = this.firstPins.bind(this);
        
    }

    componentDidMount() {
        this.props.fetchBoardPins(this.props.boardId)
    }

    firstPins() {
        // debugger;
        return (
            <div>
                {/* <img src={this.props.pins[0].url}></img>
                <img src={this.props.pins[0]}></img>
                <img src={this.props.pins[0]}></img>
                <img src={this.props.pins[0]}></img> */}
            </div>
        )
    }

    render() {
        if (this.props.pins) {
        return (
            <div className="board-item-wrap">
                <Link to={`/board/${this.props.board._id}`} >
                    <div className="board-item-top">
                        {this.props.board.pins.length >= 4 ? this.firstPins() : (<div/>) }
                    </div>
                    <div className="board-item-bottom">
                        <div className="board-item-title">{this.props.board.title} </div>
                        <div className="board-item-stats"> {this.props.board.pins.length}</div>
                    </div>
                </Link>
            </div>
        )

    } else {
        return <div></div>
    }}
}


export default withRouter(BoardItem);
