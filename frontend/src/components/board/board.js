import React from "react";
import "../home/home.css";
import "./board.css"



import Masonry from 'react-masonry-component';

const masonryOptions = {
  transitionDuration: 650,
  itemSelector: ".board-item-wrap",
  columnWidth: 270,
  fitWidth: true
};

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
    // this.showPin = this.showPin.bind(this);
    // this.parseDestinationLink = this.parseDestinationLink.bind(this);
  }

  componentDidMount() {
    //console.log(this.props.currentUser._id)
    //   debugger;
    if (this.props.currentUser)
      this.props.fetchUserBoards(this.props.currentUser.id);
  }

  componentWillReceiveProps(newState) {
    this.setState({ boards: newState.boards });
  }

  // showP(event) {
  //     event.preventDefault();
  //     this.props.showPin(this.props.pin._id);
  // }

  render() {
    //debugger;
    return (
      // <div>
      //   <div> These are my boards</div>
      //   {/* <ul>
      //     {this.props.boards.map(b => (
      //       <li>{b}</li>
      //     ))}
      //   </ul> */}
      // </div>
      <div className="boards-container-wrap">
        <div className="board-item-container">

          <div className="board-item-wrap">
            <div className="board-item-top">
            </div>
            <div className="board-item-bottom">
              <div className="board-item-title"> Jordans </div>
              <div className="board-item-stats"> 8 Pins</div>
            </div>
          </div>
          
          <div className="board-item-wrap">
            <div className="board-item-top"></div>
            <div className="board-item-bottom">
              <div className="board-item-title"> title2</div>
              <div className="board-item-stats"> # Pins</div>
            </div>
          </div>

          <div className="board-item-wrap">
            <div className="board-item-top"></div>
            <div className="board-item-bottom">
              <div className="board-item-title"> Jordans</div>
              <div className="board-item-stats"> 8 Pins</div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
