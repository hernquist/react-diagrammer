import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_PROP } from '../../../graphql/mutations';
import DisplayProps from './Props/DisplayProps';
import EditProp from './Props/EditProp';

class UpdateComponentProps extends Component {
  initialState = {
    name: "",
    proptype: 'string',
    showAddProp: false,
    highlighted: null,
    onHover: true
  }

  state = this.initialState;

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  displayAddProp = () => this.setState({ showAddProp: true });

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
  
  editProp = prop => {
    if (this.state.onHover) this.setState({ highlighted: prop });
  };

  resetHighlight = () => {
    if (this.state.onHover) this.setState({ highlighted: null});
  };

  setHighlight = () => this.setState({ onHover: false});

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
      showAddProp, 
      proptype, 
      highlighted,
      onHover
    } = this.state;

    return (
      <div>
        <DisplayProps 
          currentComponent={currentComponent}
          updateComponent={updateComponent}
          editProp={this.editProp}
          resetHighlight={this.resetHighlight}
          setHighlight={this.setHighlight}
        />

        {!showAddProp && <button onClick={this.displayAddProp}>ADD A NEW PROP</button>}
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
        {highlighted && (
          <EditProp 
            prop={highlighted} 
            edit={!onHover} 
            reset={this.discardProp}
            currentComponent={currentComponent}
            updateComponent={updateComponent}
          />
        )} 
      </div>
    );
  }
}

export default UpdateComponentProps;