import React from "react";

export default class Interest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl:
        "https://cdn2.iconfinder.com/data/icons/bold-ui/100/questionmark-2-512.png"
    };
  }
  componentDidMount() {
    this.props.scrapeImage(this.props.interest).then(res => {
      debugger;
      this.setState({});
    });
  }

  render() {
    const style = {
      background: `url("${this.state.imgUrl}")`,
      backgroundSize: "contain",
      backgroundColor: "grey"
    };
    return (
      <div id={this.props.interest} style={style} className="interest">
        <div className="interest_text">{this.props.interest}</div>
      </div>
    );
  }
}
