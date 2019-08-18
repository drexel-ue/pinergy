import React from "react";
import "./pin_show.css";

export default class PinShow extends React.Component {
  render() {
    debugger;
    return (
      <div className="pin_show">
        <div className="pin_show_image_wapper">
          <div className="pin_show_image_overlay">
            {this.props.pin.destinationLink}
          </div>
          <img
            className="pin_show_image"
            src={this.props.pin.url}
            alt={this.props.pin.title}
          />
        </div>
      </div>
    );
  }
}
