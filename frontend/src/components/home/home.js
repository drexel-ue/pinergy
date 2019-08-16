import React from "react";

export default class Home extends React.Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    return (
      <div>
        {Object.values(this.props.pins).map(pin => (
          <div>{pin.title}</div>
        ))}
      </div>
    );
  }
}
