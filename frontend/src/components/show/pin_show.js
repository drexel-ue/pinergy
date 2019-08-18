import React from "react";
import "./pin_show.css";

export default class PinShow extends React.Component {
  constructor(props) {
    super(props);

    this.parseDestinationLink = this.parseDestinationLink.bind(this)
  }

  parseDestinationLink() {
    let hostDomain;
    let { destinationLink } = this.props.pin
    if (destinationLink.indexOf("//") > -1) {
      hostDomain = destinationLink.split('/')[2];
    }
    else {
      hostDomain = destinationLink.split('/')[0];
    }
    hostDomain = hostDomain.split(':')[0];
    hostDomain = hostDomain.split('?')[0];
    return hostDomain;
  }

  render() {
    return (
      <div className="pin_show">
        <div className="pin_show_image_wrapper">
          {/* <a
            href={this.props.pin.url}
            target="_blank"
            className="pin-show-link"
          > */}
            <img
              className="pin_show_image"
              src={this.props.pin.url}
              alt={this.props.pin.title}
            />
            <div className="pin_show_image_overlay">
              <i class='fas fa-arrow-right'></i>
              &nbsp;
              {this.parseDestinationLink()}
            </div>
          {/* </a> */}
        </div>
      </div>
    );
  }
}
