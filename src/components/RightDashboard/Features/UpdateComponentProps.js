import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_PROP } from '../../../graphql/mutations';

class UpdateComponentProps extends Component {
  initialState = {
    name: "",
    proptype: 'string',
    showAddProp: false
  }

  state = this.initialState

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  displayAddProp = () => this.setState({ showAddProp: true })

  discardProp = () => {
    this.setState({ ...this.initialState});
  }

  saveProp = async (currentComponent, addProp) => {
    const componentId = currentComponent._id;
    const prop = { 
      componentId, 
      name: this.state.name,
      proptype: this.state.proptype
    }
    const { data } = await addProp({ variables: { prop } });
    const props = data.addProp.props.map(prop => ({ ...prop, componentId }));
    const updatedComponent = Object.assign({}, currentComponent, { props })
    this.props.updateComponent(updatedComponent)
    this.discardProp();
  } 

  render() {
    const { currentProject, history } = this.props;
    const pieces = history.location.pathname.split("/");
    const name = pieces[3];
    const index = pieces[4];

    const { components } = currentProject;
    if (!components) return <div>No Components</div>

    const currentComponent = components
      .filter(c => c.name === name)
      .filter(c => c.iteration === Number(index))[0];
    const { showAddProp, proptype } = this.state;

      return (
        <div>
          <h3>Existing props</h3>
          <ol>
            {currentComponent.props.map((prop, index) => 
              (<li key={prop.name + index}>{`${prop.name}: ${prop.proptype}`}</li>)
            )}
          </ol>
          {!showAddProp && <button onClick={this.displayAddProp}>ADD PROP</button>}
          {showAddProp &&
            <Mutation mutation={ADD_PROP}>
              {AddProp => (
                <div>
                  <label> 
                    Prop NAME 
                    <input onChange={(e) => this.handleChange(e, 'name')} value={this.state.name}/>
                  </label>
                  <label> 
                    PROPTYPE 
                    <select value={proptype} onChange={(e) => this.handleChange(e, 'proptype')}>
                      <option value="boolean">boolean</option>
                      <option value="number">number</option>
                      <option value="string">string</option>
                      <option value="array">array</option>
                      <option value="object">object</option>
                    </select>
                  </label>
                  <button onClick={() => this.saveProp(currentComponent, AddProp)}>ADD PROP</button>  
                  <button onClick={this.discardProp}>DISCARD PROP</button>  
                </div>
              )}
            </Mutation>
          }
        </div>
      );

      // <Mutation
      //   mutation={EDIT_COMPONENT_NAME}
      // >
      //   {EditComponentName => (
      //     <div>
      //       Edit name
      //       <input onChange={this.handleChange} value={this.state.name}>
      //       </input>

      //       Do you want to update this component's name?
      //       <button onClick={() => { this.updateName(currentComponent, EditComponentName) }}>YES</button>
      //       <button onClick={this.leave}
      //       >
      //         NO
      //       </button>
      //     </div>
      //   )}
      // </Mutation>
  }
}

export default UpdateComponentProps;