import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { EDIT_COMPONENT_NAME } from '../../../graphql/mutations';

class EditComponentName extends Component {
  state = {
    name: ""
  }

  handleInput = e => this.setState({name: e.target.value});

  updateName = async ({ _id }, mutation) => {
    const { data } = await mutation({ variables: { _id, name: this.state.name } });
    this.props.updateComponent(data.editComponentName);
    const parts = this.props.history.location.pathname.split("/");
    parts[3] = data.editComponentName.name;
    this.props.history.push(parts.join("/"));
  }
  
  leave = () => this.props.history.push(this.props.history.location.pathname.split("/").slice(0, 5).join("/"))
    
  render() {
    const { currentProject, history } = this.props;
    const pieces = history.location.pathname.split("/");
    const name = pieces[3];
    const index = pieces[4];

    const { components } = currentProject;
    if (!components) {
      return <div>No Components</div>
    }

    const currentComponent = components
      .filter(c => c.name === name)
      .filter(c => c.iteration === Number(index))[0]

    return (
      <Mutation
        mutation={EDIT_COMPONENT_NAME}
      >
        {EditComponentName => (
          <div>
            Edit name
            <input onChange={this.handleInput} value={this.state.name}>
            </input>

            Do you want to update this component's name?
            <button onClick={()=> {this.updateName(currentComponent, EditComponentName)}}>YES</button>
            <button onClick={this.leave}  
            >
              NO
            </button>
          </div>

        )} 
      </Mutation>
    );
  }
}

export default EditComponentName;