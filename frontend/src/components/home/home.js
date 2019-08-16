import React from "react";

export default class Home extends React.Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    return (
      <div className="home">
        {Object.values(this.props.pins).map(pin => (
          <div key={pin.id}>
            <PinContainer />
          </div>
        ))}
      </div>
    );
  }
}
