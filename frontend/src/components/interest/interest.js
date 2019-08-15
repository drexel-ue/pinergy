import React from "react";
import { scrape } from "../../util/scrape_util";

export default class Interest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl:
        "https://cdn2.iconfinder.com/data/icons/bold-ui/100/questionmark-2-512.png"
    };
  }

  componentDidMount() {
    scrape({ keyWords: [this.props.interest] })
      .then(res => {
        this.setState({ imgUrl: res.data[this.props.interest] });
      })
      .catch(res => {
        console.log(res);
      });
  }

  render() {
    const imgStyle = {
      height: "136px",
      width: "136px"
    };

    return (
      <div id={this.props.interest} className="interest">
        <img
          src={this.state.imgUrl}
          id={`${this.props.interest}_img`}
          style={imgStyle}
        />
        <div className="interest_text">{this.props.interest}</div>
      </div>
    );
  }
}
