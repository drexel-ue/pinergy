import React from "react";
import "./pin_show.css";

export default class PinShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false,
    };

    this.togglePinDrop = this.togglePinDrop.bind(this);
    this.toggleOffPinDrop = this.toggleOffPinDrop.bind(this);
    this.parseDestinationLink = this.parseDestinationLink.bind(this);
  }

  componentDidMount() {
    this.props.fetchPin(this.props.match.params.id);
    window.addEventListener("click", this.toggleOffPinDrop)
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.toggleOffPinDrop)
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

  togglePinDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showDropDown: !this.state.showDropDown });
  }

  toggleOffPinDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.showDropDown) {
      this.setState({ showDropDown: false });
    }
  }

  pinDropDown() {
    return this.state.showDropDown ? (
      <div className="">
        <div>
          <h1>MENU GOES HERE</h1>
        </div>
      </div>
    ) : (
        <div className="" />
      );
  }

  render() {
    return this.props.pin ? (
      <div className="pin-show-outer">
        <div className="pin_show_image_wrapper">
          <div className="pin_stick_bar">
            <div className="pin_menu"
              onClick={this.togglePinDrop}>
              <i className="fas fa-ellipsis-h ell-show"></i>
              {this.pinDropDown()}
            </div>
            <div className="stick-bar-right">
              <div className="pin-show-share">
                <i class='fas fa-share-alt'></i>
                &nbsp;&nbsp;Share
              </div>
              <div className="pin-show-save">
                <i class="fas fa-thumbtack"></i>
                &nbsp;&nbsp;Save
              </div>
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
