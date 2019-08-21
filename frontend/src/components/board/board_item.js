import React from "react";
import "../home/home.css";
import { withRouter } from "react-router-dom";
import "./board.css"



class BoardItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: []
        };
    }

    render() {

        return (
            <div className="board-item-wrap">
                <div className="board-item-top"></div>
                <div className="board-item-bottom">
                    <div className="board-item-title">{this.props.board.title} </div>
                    <div className="board-item-stats"> 10 Pins</div>
                </div>
            </div>
        )

    }
}


export default withRouter(BoardItem);
