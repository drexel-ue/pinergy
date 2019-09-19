import React from "react";
import "./pin_show.css";

export default class PinShow extends React.Component {
  constructor(props) {
    super(props);
    this.parseDestinationLink = this.parseDestinationLink.bind(this);
  }

  componentDidMount() {
    this.props.fetchPin(this.props.match.params.id);
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

  render() {
    return this.props.pin ? (
      <div className="pin-show-outer">
        <div className="pin_show_image_wrapper">
          <div className="pin_stick_bar">
            <div className="pin_menu">
              <i className="fas fa-ellipsis-h ell-show"></i>
            </div>
            <div className="pin-show-save">
              <i class="fas fa-thumbtack"></i>
              &nbsp;&nbsp;Save
            </div>
          </div>
          <div className="pin-show-bottom">
          <div className="pin-show-left">
            <a href={this.props.pin.url} target="_blank" className="pin-atag">
              <img
                className="pin-show-image"
                src={this.props.pin.url}
                alt={this.props.pin.title}
              />
              <div className="pin-show-link" onClick={this.openLink}>
                <i className="fas fa-arrow-right"></i>
                &nbsp;{this.parseDestinationLink()}
              </div>
            </a>
          </div>
          <div className="pin-show-right">
            <div className="pin-show-info">
              <div className="pin-show-title">{this.props.pin.title}</div>
              <div className="pin-show-desc">{this.props.pin.description}</div>
            </div>
          </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="pin_show_image_wrapper">
        <div>loading...</div>
      </div>
    );
  }
}
