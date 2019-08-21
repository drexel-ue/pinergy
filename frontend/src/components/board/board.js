import React from "react";
import "../home/home.css";
import { withRouter } from "react-router-dom";
import "./board.css"


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
  }

  //
  componentDidMount() {
    if (this.props.user) {
      this.props.fetchUserBoards(this.props.user._id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.fetchUserBoards(this.props.user._id)
    }
  }

  componentWillReceiveProps(newState) {
    this.setState({ boards: newState.boards });
  }

  render() {
    if (this.props.boards.length > 0) {
      return (
        <div>
          <div>These are my boards</div>

          <ul>
            {this.props.boards.map(b => (
              <li>{b.title}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div> {this.props.user.username} has no boards yet! </div>;
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
