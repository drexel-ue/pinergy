import React from "react";
import "../home/home.css";

export default class Pin extends React.Component {
  constructor(props) {
    super(props)

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
      <div className="home-pin-wrap">
        <img className="home-pin-img" src={this.props.pin.url} />
        <div className="pin-button home-save">
          <i class='fas fa-thumbtack'></i>
          &nbsp;&nbsp;Save
        </div>
        <a 
          href={this.props.pin.url}
          target="_blank"
          className="pin-button home-link"
        >
          <div className="home-link-right">
            <i class='fas fa-arrow-right'></i>
          </div>
          <div className="home-link-left">
            {this.parseDestinationLink()}
          </div>
        </a>
      </div>
    );
  }
}
