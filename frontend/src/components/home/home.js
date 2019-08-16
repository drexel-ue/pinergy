import React from "react";

export default class Home extends React.Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    const style = {
      height: "50px",
      width: "50px"
    };
    return (
      <div>
        {Object.values(this.props.pins).map(pin => (
          <img src={pin.url} style={style} />
        ))}
      </div>
    );
  }
}
