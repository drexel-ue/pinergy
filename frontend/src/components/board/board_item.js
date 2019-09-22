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
        
    }

    componentDidMount() {
        this.props.fetchBoardPins(this.props.boardId).then(res => {
            this.setState({pins: res})
        })
    }

    render() {
        const { numOfPins, pins } = this.state 
        return (
            <div className="board-item-wrap">
                <Link to={`/board/${this.props.board._id}`} >
                    <div className="board-item-top">
                        { pins.length >= 4 ? (<div/>):(<div/>) }
                    </div>
                    <div className="board-item-bottom">
                        <div className="board-item-title">{this.props.board.title} </div>
                        <div className="board-item-stats"> {numOfPins}</div>
                    </div>
                </Link>
            </div>
        )

    }
}


export default withRouter(BoardItem);
