import React from "react";
import "../home/home.css";
import { withRouter } from "react-router-dom";
import "./board.css"

const masonryOptions = {
  transitionDuration: 650,
  itemSelector: ".board-item-wrap",
  columnWidth: 270,
  fitWidth: true
};


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
  }

  //
  componentDidMount() {
    // debugger
    // this.props.fetchUser(this.ownProps.user.id);
    this.props.fetchUserBoards(this.props.match.params.user_id);
  }

  componentWillReceiveProps(newState) {
    this.setState({ boards: newState.boards });
  }

  // showP(event) {
  //     event.preventDefault();
  //     this.props.showPin(this.props.pin._id);
  // }

  render() {

    if (this.props.boards.length > 0) {
      return (
        <div>
          <div> These are my boards</div>

          <ul>
            {this.props.boards.map(b => (
              <li>{b.title}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>has no boards yet! </div>;
    }

//     return (
      // <div>
      //   <div> These are my boards</div>
      //   {/* <ul>
      //     {this.props.boards.map(b => (
      //       <li>{b}</li>
      //     ))}
      //   </ul> */}
      // </div>
//       <div className="boards-container-wrap">
//         <div className="board-item-container">

//           <div className="board-item-wrap">
//             <div className="board-item-top">
//             </div>
//             <div className="board-item-bottom">
//               <div className="board-item-title"> Jordans </div>
//               <div className="board-item-stats"> 8 Pins</div>
//             </div>
//           </div>
          
//           <div className="board-item-wrap">
//             <div className="board-item-top"></div>
//             <div className="board-item-bottom">
//               <div className="board-item-title"> title2</div>
//               <div className="board-item-stats"> # Pins</div>
//             </div>
//           </div>

//           <div className="board-item-wrap">
//             <div className="board-item-top"></div>
//             <div className="board-item-bottom">
//               <div className="board-item-title"> Jordans</div>
//               <div className="board-item-stats"> 8 Pins</div>
//             </div>
//           </div>

//         </div>
//       </div>
//     );

  }
}

export default withRouter(Board);
