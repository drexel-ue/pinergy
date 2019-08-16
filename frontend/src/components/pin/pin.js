import React from "react";

export default class Pin extends React.Component {
  render() {
    return (
      <div className="home_pin_wrapper">
        <img className="home_pin" src={this.props.pin.url} />
      </div>
    );
  }
}
