import React from "react";
import "../home/home.css";

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
      <div>
        <div> These are my boards</div>
        {/* <ul>
          {this.props.boards.map(b => (
            <li>{b}</li>
          ))}
        </ul> */}
      </div>
    );
  }
}
