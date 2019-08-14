import React from "react";



export default class Interest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: "https://cdn2.iconfinder.com/data/icons/bold-ui/100/questionmark-2-512.png"
    }
  }
  componentDidMount() {
    this.props.scrapeImage(this.props.interest)
      .then(res => {
        debugger
        this.setState({})
      })
  }
  
  render() {
    return (
      <div
        id={this.props.interest}
        className="interest"
      > <img className="iimg" src={this.state.imgUrl}/>
        <div className="interest_text">{this.props.interest}</div>
      </div>
    );
  }
}

