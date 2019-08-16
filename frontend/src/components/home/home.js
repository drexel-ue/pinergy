import React from "react";

export default class Home extends React.Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    return <div>home to come..</div>;
  }
}
