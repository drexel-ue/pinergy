import React from "react";
import "../home/home.css";
import { withRouter } from "react-router-dom";
import "./board.css"



class BoardItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            numOfPins: this.props.board.pins.length
        };
        
    }

    componentDidMount() {
        this.props.fetchBoardPins(this.props.boardId)
    }

    render() {
        const { numOfPins } = this.state 
        const { pins } = this.props.board
        // debugger
        return (
            <div className="board-item-wrap">
                <div className="board-item-top">
                    { pins.length >= 6 ? (<div/>):(<div/>) }
                </div>
                <div className="board-item-bottom">
                    <div className="board-item-title">{this.props.board.title} </div>
                    <div className="board-item-stats"> {numOfPins}</div>
                </div>
            </div>
        )

    }
}

// let boardPins = this.props.pins.map(pin => (
//     <div className="board-item-wrap">
//         <div className="board-item-top">
//         </div>
//         <div className="board-item-bottom">
//             <div className="board-item-title">{this.props.board.title} </div>
//             <div className="board-item-stats"> 10 Pins</div>
//         </div>
//     </div>
// ))


export default withRouter(BoardItem);
