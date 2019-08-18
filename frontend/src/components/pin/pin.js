import React from "react";
import "../home/home.css";

export default class Pin extends React.Component {
  render() {

    return (
      <div className="home-pin-wrap">
        <div className="home-pin-save"> Save </div>
        <img className="home-pin-img" src={this.props.pin.url} />
        <div className="home-pin-link"> www.test.com </div>
      </div>
    );
  }
}
