import React from "react";
import PinContainer from "../pin/pin_container";
import './home.css'

export default class Home extends React.Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    return Object.values(this.props.pins).length > 0 ? (
      <div className="home">
        {Object.values(this.props.pins).map(pin => (
          <div key={pin.id}>
            <PinContainer pin={pin} />
          </div>
        ))}
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}
