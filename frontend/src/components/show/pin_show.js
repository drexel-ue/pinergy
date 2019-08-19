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
          <div className="pin-show-top"> 
            <div className="pin-show-save">
            <i class='fas fa-thumbtack'></i>
            &nbsp;&nbsp;Save
            </div>
          </div>
            <img
              className="pin_show_image"
              src={this.props.pin.url}
              alt={this.props.pin.title}
            />
              <a
                href={this.props.pin.url}
                target="_blank"
                className="pin-show-link"
              >
                <div className="show-link-right">
                  <i class='fas fa-arrow-right'></i>
                </div>
                <div className="show-link-left">
                  {this.parseDestinationLink()}
                </div>
              </a>
            {/* </div> */}
        </div>
      </div>
    );
  }
}
