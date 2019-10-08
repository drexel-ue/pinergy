import React, { Component } from "react";
import "./scroll_to_top.css";

export default class ScrollToTop extends Component {
  constructor() {
    super();

    this.state = {
      show: false
    };

    this.showOrNah = this.showOrNah.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.showOrNah, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.showOrNah, false);
  }

  showOrNah() {
    if (window.pageYOffset >= window.innerHeight * 1.5) {
      if (!this.state.show) this.setState({ show: true });
    } else {
      if (this.state.show) this.setState({ show: false });
    }
  }

  render() {
    const style = { top: `${window.innerHeight - 80}px`, right: "30px" };
    return (
      <div className="scroll_to_top" style={style}>
        {this.state.show ? <i class="fas fa-sort-up"></i> : <div />}
      </div>
    );
  }
}
