import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_PROP, EDIT_PROP } from '../../../../graphql/mutations';

class EditProp extends Component {
  constructor(props) {
    super(props)
    this.state = props.prop
  }

  handleChange = (e, key) => this.setState({[key]: e.target.value});

  updateProp = async (_id, editProp) => {
    const { name, proptype } = this.state;
    const { data } = await editProp({ variables: { _id, name, proptype } });
    const { currentComponent } = this.props;
    console.log('dataEdit', data.editProp);
    const props = currentComponent.props.map(prop => _id === prop._id ? data.editProp : prop);
    const updatedComponent = Object.assign({}, currentComponent, { props });
    this.props.updateComponent(updatedComponent);
    this.props.reset();
  }

  deleteProp = async (_id, deleteProp) => {
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
    const { name, proptype } = this.state;
    const { _id } = this.props.prop;

    return (
      <Mutation mutation={EDIT_PROP}>
        {EditProp => (
          <Mutation mutation={DELETE_PROP}>
            {DeleteProp => (
              <div style={{ padding: "20px 4px 0 4px"}}>
                {`${name}: ${proptype}`}
                <input onChange={e => this.handleChange(e, 'name')} value={name}/>
                <select onChange={e => this.handleChange(e, 'proptype')} value={proptype}>
                  <option value="boolean">boolean</option>
                  <option value="number">number</option>
                  <option value="string">string</option>
                  <option value="array">array</option>
                  <option value="object">object</option>
                </select>
                <button onClick={() => this.updateProp(_id, EditProp)}>UPDATE PROP</button>
                <button onClick={() => this.deleteProp(_id, DeleteProp)}>DELETE PROP</button>
              </div>
            )}  
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default EditProp;