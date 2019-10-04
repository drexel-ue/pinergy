import React from "react";
import { Link } from "react-router-dom";
import "../home/home.css";

export default class Pin extends React.Component {
  constructor(props) {
    super(props);

    this.showPin = this.showPin.bind(this);
    this.parseDestinationLink = this.parseDestinationLink.bind(this);
  }

  parseDestinationLink() {
    let hostDomain;
    let { destinationLink } = this.props.pin;
    if (destinationLink.indexOf("//") > -1) {
      hostDomain = destinationLink.split("/")[2];
    } else {
      hostDomain = destinationLink.split("/")[0];
    }
    hostDomain = hostDomain.split(":")[0];
    hostDomain = hostDomain.split("?")[0];
    return hostDomain;
  }

  showPin(event) {
    event.preventDefault();
    this.props.showPin(this.props.pin._id);
  }

  render() {
    return (
      <div className="home-pin-wrap">
        <Link to={`/pins/${this.props.pin._id}`}>
          <img alt="" className="home-pin-img" src={this.props.pin.url} />
        </Link>
        <a
          rel="noopener noreferrer"
          href={this.props.pin.destinationLink}
          target="_blank"
          className="pin-button home-link"
        >
          <div className="home-link-right">
            <i className="fas fa-arrow-right" />
          </div>
          <div className="home-link-left">{this.parseDestinationLink()}</div>
        </a>
      </div>
    );
  }
}
