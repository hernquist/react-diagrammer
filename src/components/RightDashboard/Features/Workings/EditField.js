import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_PROP, EDIT_PROP } from '../../../../graphql/mutations';

class EditField extends Component {
  constructor(props) {
    super(props)
    this.state = {field: props.field}; 
  }

  handleChange = (e, key) => {
    this.setState({ field: {...this.state.field, [key]: e.target.value} });
  }

  updateField = async (_id, editProp) => {
    const { name, proptype, statetype } = this.state.field;

    const { data } = await editProp({ variables: { _id, name, proptype } });
    const { currentComponent } = this.props;
    console.log('dataEdit', data.editProp);
    const props = currentComponent.props.map(prop => _id === prop._id ? data.editProp : prop);
    const updatedComponent = Object.assign({}, currentComponent, { props });
    this.props.updateComponent(updatedComponent);
    this.props.reset();
  }

  deleteField = async (_id, deleteProp) => {
    const { data } = await deleteProp({ variables: { _id } });
    if (data.deleteProp) {
      const { currentComponent } = this.props;
      const props = currentComponent.props.filter(prop => _id !== prop._id);
      const updatedComponent = Object.assign({}, currentComponent, { props });
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

    return (
      <Mutation mutation={EDIT_PROP}>
        {EditProp => (
          <Mutation mutation={DELETE_PROP}>
            {DeleteProp => (
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
                <button onClick={() => this.updateField(_id, EditProp)}>UPDATE {type}</button>
                <button onClick={() => this.deleteField(_id, DeleteProp)}>DELETE {type}</button>
              </div>
            )}  
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default EditField;