import React, { Component } from "react";

class FullLayout extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default FullLayout;
