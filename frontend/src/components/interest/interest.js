import React from "react";

export default class Interest extends React.Component {

  render() {
    const imgStyle = {
      height: "136px",
      width: "136px"
    };

    return (
        <div id={`${this.props.interest}_img`} className="interest">
          <i className='fas fa-check-circle'></i>
          <img
            src={this.props.url}
            style={imgStyle}
          />
          <div className="interest_text">{this.props.interest}</div>
        </div>
    );
  }
}
