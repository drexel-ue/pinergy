import React from "react";
import "./pin_show.css";

export default class PinShow extends React.Component {
  render() {
    return (
      <div className="pin_show">
        <div className="pin_show_image_wrapper">
          <img
            className="pin_show_image"
            src={this.props.pin.url}
            alt={this.props.pin.title}
          />
          <div className="pin_show_image_overlay">
            {this.props.pin.destinationLink}
          </div>
        </div>
      </div>
    );
  }
}
