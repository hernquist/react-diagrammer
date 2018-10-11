import { Component } from 'react'

export default class Toggle extends Component {
  state = {
    visible: false
  }

  toggle = () => this.setState((prevState) => ({
    visible: !prevState.visible
  }))

  render() {
    const { children } = this.props;
    return children({
      visible: this.state.visible,
      toggle: this.toggle,
    })
  }
}