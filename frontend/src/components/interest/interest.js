import React from "react";
import { scrape } from "../../util/scrape_util";

export default class Interest extends React.Component {

  render() {
    const imgStyle = {
      height: "136px",
      width: "136px"
    };

    return (
      <div id={this.props.interest} className="interest">
        <img
          src={this.props.url}
          id={`${this.props.interest}_img`}
          style={imgStyle}
        />
        <div className="interest_text">{this.props.interest}</div>
      </div>
    );
  }
}
