import React from "react";
import PinContainer from "../pin/pin_container";
import Masonry from 'react-masonry-component';
import './home.css'

const masonryOptions = {
  transitionDuration: 650,
  itemSelector: ".home-pin-wrap",
  columnWidth: 270,
  fitWidth: true
};

export default class Home extends React.Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    return Object.values(this.props.pins).length > 0 ? (
      <div className="home-grid">
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
        <div>Loading...</div>
      );
  }
}
