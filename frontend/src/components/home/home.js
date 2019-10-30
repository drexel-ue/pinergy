import React from "react";
import PinContainer from "../pin/pin_container";
import Masonry from "react-masonry-component";
import Loader from "../loader/loader";
import request from "superagent";
import debounce from "lodash.debounce";
import "./home.css";

const masonryOptions = {
  transitionDuration: 650,
  itemSelector: ".home-pin-wrap",
  columnWidth: 270,
  fitWidth: true
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.inifiniteScroller = this.infiniteScroler.bind(this);
  }
  componentDidMount() {
    this.props.getAll();
  }

  infiniteScroler() {
    window.onscroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.props.getAll();
      }
    }, 100);
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
        {this.infiniteScroler()}
      </div>
    ) : (
      <Loader />
    );
  }
}
