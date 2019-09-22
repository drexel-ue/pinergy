import React from "react";
import PinContainer from "../pin/pin_container";
import Masonry from "react-masonry-component";
import ProfileHeaderContainer from "../profile/profile_head_container";
import Loader from "../loader/loader";
import "../home/home.css";
import "./board.css"

const masonryOptions = {
  transitionDuration: 650,
  itemSelector: ".home-pin-wrap",
  columnWidth: 270,
  fitWidth: true
};

export default class BoardPins extends React.Component {

  componentDidMount() {
    this.props.fetchBoardPins(this.props.match.params.boardId);
  }

  componentDidUpdate() {
    this.props.fetchBoardPins(this.props.match.params.boardId);
  }

  render() {
    return Object.values(this.props.pins).length > 0 ? (
      <div className="home-grid">
        {/* <ProfileHeaderContainer /> */}
        <Masonry
          className="home-masonry"
          elementType="div"
          updateOnEachImageLoad={true}
          options={masonryOptions}
        >
          {Object.values(this.props.pins).map(pin => (
            <PinContainer key={pin._id} pin={pin} />
          ))}
        </Masonry>
      </div>
    ) : (
        <Loader />
      );
  }
}
