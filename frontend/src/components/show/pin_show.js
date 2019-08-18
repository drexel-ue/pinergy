import React from "react";
import "./pin_show.css";

export default class PinShow extends React.Component {
  render() {
    return (
      <div className="pin_show">
        <img src={this.props.pin.url} alt={this.props.pin.title} />
      </div>
    );
  }
}
