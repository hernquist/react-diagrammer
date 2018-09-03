import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { 
  DELETE_PROP, 
  EDIT_PROP,
  DELETE_STATE,
  EDIT_STATE
} from '../../../../graphql/mutations';

class EditField extends Component {
  constructor(props) {
    super(props)
    this.state = {field: props.field}; 
  }

  handleChange = (e, key) => {
    this.setState({ field: {...this.state.field, [key]: e.target.value} });
  }

  updateWithProps = (id, currentComponent, data) => {
    const props = currentComponent.props.map(prop => id === prop._id ? data.editProp : prop);
    return Object.assign({}, currentComponent, { props });
  }

  updateWithState = (id, currentComponent, data) => {
    const state = currentComponent.state.map(s => id === s._id ? data.editState : s);
    return Object.assign({}, currentComponent, { state });
  }

  updateField = async (_id, mutation) => {
    const { name, proptype, statetype } = this.state.field;
    const { type, currentComponent } = this.props;
    const { data } = type === 'state' ? 
      await mutation({ variables: { _id, name, statetype }})
      : await mutation({ variables: { _id, name, proptype } });
    const updatedComponent = type === 'state' ? 
      await this.updateWithState(_id, currentComponent, data) 
      : await this.updateWithProps(_id, currentComponent, data)
    
    this.props.updateComponent(updatedComponent);
    this.props.reset();
  }

  deleteField = async (_id, mutation) => {
    const { data } = await mutation({ variables: { _id } });
    if (data.deleteProp || data.deleteState) {
      const { currentComponent, type } = this.props;
      let updatedComponent;
      if (type === 'state') {
        const state = currentComponent.state.filter(s => _id !== s._id);
        updatedComponent = Object.assign({}, currentComponent, { state });
      } else if (type === 'props') {
        const props = currentComponent.props.filter(prop => _id !== prop._id);
        updatedComponent = Object.assign({}, currentComponent, { props });
      }
      this.props.updateComponent(updatedComponent);
      this.props.reset();
    } else {
      console.log("Delete not working!");
    }
  }

  render() {
    const { field } = this.state;
    const { type } = this.props;
    const { _id } = field;
    const fieldtype = type === 'state' ? 'statetype' : 'proptype';
    const EDIT = type === 'state' ? EDIT_STATE : EDIT_PROP; 
    const DELETE = type === 'state' ? DELETE_STATE : DELETE_PROP; 

    return (
      <Mutation mutation={EDIT}>
        {Edit => (
          <Mutation mutation={DELETE}>
            {Delete => (
              <div style={{ padding: "20px 4px 0 4px"}}>
                {`${field.name}: ${field[fieldtype]}`}
                <input onChange={e => this.handleChange(e, 'name')} value={field.name}/>
                <select 
                  onChange={e => this.handleChange(e, fieldtype)} 
                  value={field[fieldtype]}
                >
                  <option value="boolean">boolean</option>
                  <option value="number">number</option>
                  <option value="string">string</option>
                  <option value="array">array</option>
                  <option value="object">object</option>
                </select>
                <button
                  className="dashboard-button"
                  onClick={() => this.updateField(_id, Edit)}
                >
                  UPDATE {type}
                </button>
                <button
                  className="dashboard-button"
                  onClick={() => this.deleteField(_id, Delete)}
                >
                  DELETE {type}
                </button>
              </div>
            )}  
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default EditField;