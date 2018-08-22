import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_PROP, ADD_STATE } from '../../../graphql/mutations';
import DisplayFields from './Workings/DisplayFields';
import EditField from './Workings/EditField';

class UpdateComponentWorkings extends Component {
  initialState = {
    value1: "",
    value2: "string",
    showAddField: false,
    highlighted: null,
    onHover: true
  }

  state = this.initialState;

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  displayAddField = () => this.setState({ showAddField: true });

  discardField = () => this.setState({ ...this.initialState});

  mutationProp = async (currentComponent, mutation) => {
    const componentId = currentComponent._id;
    const prop = {
      componentId,
      name: this.state.value1,
      proptype: this.state.value2
    };
    const { data } = await mutation({ variables: { prop } });
    const props = data.addProp.props.map(prop => ({ ...prop, componentId }));
    return Object.assign({}, currentComponent, { props });
  }

  mutationState = async (currentComponent, mutation) => {
    const componentId = currentComponent._id;
    const state = {
      componentId,
      name: this.state.value1,
      statetype: this.state.value2
    };
    const { data } = await mutation({ variables: { state } });
    const stateObjects = data.addState.state.map(stateItem => ({ ...stateItem, componentId }));
    return Object.assign({}, currentComponent, { state: stateObjects });
  }

  saveField = async (currentComponent, mutation) => {
    const updatedComponent = this.props.type === 'state' ? 
      await this.mutationState(currentComponent, mutation) : 
      await this.mutationProp(currentComponent, mutation);
    console.log(updatedComponent);
    this.props.updateComponent(updatedComponent)
    this.discardField();
  }
  
  editField = field => {
    if (this.state.onHover) this.setState({ highlighted: field });
  };

  resetHighlight = () => {
    if (this.state.onHover) this.setState({ highlighted: null});
  };

  setHighlight = () => this.setState({ onHover: false});

  render() {
    const { currentProject, history, updateComponent, type } = this.props;
    
    const { components } = currentProject;
    if (!components) return <div>No Components</div>

    const pieces = history.location.pathname.split("/");
    const name = pieces[3];
    const index = pieces[4];    
    const currentComponent = components
      .filter(c => c.name === name)
      .filter(c => c.iteration === Number(index))[0];
    const { 
      showAddField, 
      value1,
      value2, 
      highlighted,
      onHover
    } = this.state;

    const MUTATION = type === 'state' ? ADD_STATE : ADD_PROP; 

    return (
      <div>
        <DisplayFields 
          currentComponent={currentComponent}
          updateComponent={updateComponent}
          editField={this.editField}
          resetHighlight={this.resetHighlight}
          setHighlight={this.setHighlight}
          type={type}
        />

        {!showAddField && <button onClick={this.displayAddField}>ADD A NEW {type}</button>}
        {showAddField &&
          <Mutation mutation={MUTATION}>
            {AddField => (
              <div>
                <label> 
                  {type} NAME 
                  <input onChange={(e) => this.handleChange(e, 'value1')} value={value1}/>
                </label>
                <label> 
                  {type === 'state' ? "STATE TYPE" : "PROPTYPE"} 
                  <select value={value2} onChange={(e) => this.handleChange(e, 'value2')}>
                    <option value="boolean">boolean</option>
                    <option value="number">number</option>
                    <option value="string">string</option>
                    <option value="array">array</option>
                    <option value="object">object</option>
                  </select>
                </label>
                <button onClick={() => this.saveField(currentComponent, AddField)}>ADD {type}</button>  
                <button onClick={this.discardField}>DISCARD {type}</button>  
              </div>
            )}
          </Mutation>
        }
        {highlighted && (
          <EditField
            field={highlighted} 
            edit={!onHover} 
            reset={this.discardField}
            currentComponent={currentComponent}
            updateComponent={updateComponent}
            type={type}
          />
        )} 
      </div>
    );
  }
}

export default UpdateComponentWorkings;