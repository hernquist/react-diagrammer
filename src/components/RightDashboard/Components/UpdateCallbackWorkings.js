import React, { Component } from 'react'
import DisplayCallbacks from './Callbacks/DisplayCallbacks';

export default class UpdateCallbackWorkings extends Component {
  state = {
    highlighted: null,
    onHover: true
  }
  render() {
    const { currentProject, history, updateComponent } = this.props;
    const { components } = currentProject;
    if (!components) return <div>No Components</div>

    const pieces = history.location.pathname.split("/");
    const name = pieces[3];
    const index = pieces[4];
    const currentComponent = components
      .filter(c => c.name === name)
      .filter(c => c.iteration === Number(index))[0];
    const {
      highlighted,
      onHover
    } = this.state;

    return (
      <div>
        <DisplayCallbacks 
          currentComponent={currentComponent}
          editCallback={this.editCallback}
          resetHighlight={this.resetHighlight}
          setHighlight={this.setHighlight}
        />

      </div>
    )
  }
}
