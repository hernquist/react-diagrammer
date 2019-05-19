import React, { Component } from "react";
import ShowProject from "./ShowProject";

class ManagePolling extends Component {
  state = {
    currentCount: 0,
    intervalId: null
  };

  componentDidMount() {
    const intervalId = setInterval(this.timer, 3000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  timer = () => {
    if (this.state.currentCount === this.props.projects.length - 1) {
      this.setState({ currentCount: 0 });
    } else {
      this.setState({ currentCount: this.state.currentCount + 1 });
    }
  };

  render() {
    const { projects } = this.props;
    const { currentCount } = this.state;
    const project = projects[currentCount];

    return <ShowProject currentProject={project} />;
  }
}

export default ManagePolling;
