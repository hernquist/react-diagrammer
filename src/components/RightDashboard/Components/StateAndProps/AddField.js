import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_PROP, ADD_STATE } from '../../../../graphql/mutations';

class AddField extends Component {
  mutationProp = async (currentComponent, mutation) => {
    const componentId = currentComponent._id;
    const prop = {
      componentId,
      name: this.props.value1,
      proptype: this.props.value2
    };
    const { data } = await mutation({ variables: { prop } });
    const props = data.addProp.props.map(prop => ({ ...prop, componentId }));
    return Object.assign({}, currentComponent, { props });
  }

  mutationState = async (currentComponent, mutation) => {
    const componentId = currentComponent._id;
    const state = {
      componentId,
      name: this.props.value1,
      statetype: this.props.value2
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
    this.props.discardField();
  }

  render() {
    const { type, currentComponent, value1, value2, handleChange, discardField } = this.props;
    const MUTATION = type === 'state' ? ADD_STATE : ADD_PROP;

    return (
      <Mutation mutation={MUTATION}>
        {AddField => (
          <div>
            <label>
              {type} NAME
                <input onChange={(e) => handleChange(e, 'value1')} value={value1} />
            </label>
            <label>
              {type === 'state' ? "STATE TYPE" : "PROPTYPE"}
              <select value={value2} onChange={e => handleChange(e, 'value2')}>
                <option value="boolean">boolean</option>
                <option value="number">number</option>
                <option value="string">string</option>
                <option value="array">array</option>
                <option value="object">object</option>
              </select>
            </label>
            <button
              className="dashboard-button" 
              onClick={() => this.saveField(currentComponent, AddField)}
            >
              ADD {type}
            </button>
            <button 
              className="dashboard-button"
              onClick={discardField}
            >
              DISCARD {type}
            </button>
          </div>
        )}
      </Mutation>
    );
  }
}

export default AddField;