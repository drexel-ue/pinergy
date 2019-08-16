import React from "react";
import "../home/home.css";

export default class Pin extends React.Component {
  render() {
    return (
      <div className="home_pin_wrapper">
        <img className="home_pin" src={this.props.pin.url} />
      </div>
    );
  }
}
