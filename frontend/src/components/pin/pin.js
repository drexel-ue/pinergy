import React from "react";
import "../home/home.css";

export default class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.showPin = this.showPin.bind(this);
  }

  showPin(event) {
    event.preventDefault();
    this.props.showPin(this.props.pin._id);
  }

  render() {
    return (
      <div className="home-pin-wrap" onClick={this.showPin}>
        <img className="home-pin-img" src={this.props.pin.url} />
      </div>
    );
  }
}
