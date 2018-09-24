import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import CallbackForm from './CallbackForm';
import { DELETE_CALLBACK, EDIT_CALLBACK } from '../../../../graphql/mutations'

export default class DisplayCallbacks extends Component {
  state = {
    argName: "",
    typeName: "",
    stateField: "",
    stateChange: "",
  }
  
  static getDerivedStateFromProps(props, prevState) {
    const state = {
      name: prevState.name || props.highlighted.name,
      description: prevState.description || props.highlighted.description,
      functionArgs: prevState.functionArgs || props.highlighted.functionArgs,
      setState: prevState.setState || props.highlighted.setState,
      renderEditForm: prevState ? prevState.renderEditForm : false,
      

    }
    return {...prevState, ...state };
  }

  handleChange = (e, key) => {
    console.log(e.target.value, key);
    this.setState({ [key]: e.target.value });
  }

  addElement = key => {
    console.log('addElement', key)
    const { argName, typeName, functionArgs, stateField, stateChange, setState } = this.state;
    key === 'functionArgs' && this.setState({
      functionArgs: [...functionArgs, { name: argName, typeName }],
      argName: "",
      typeName: ""
    })
    key === 'setState' && this.setState({
      setState: [...setState, { stateField, stateChange }],
      stateField: "",
      stateChange: ""
    })
  }

  deleteCallback = async mutation => {
    const { _id } = this.props.highlighted;
    const { data } = await mutation({ variables: { _id } });
    console.log(data);
    // TODO should be based on data variable
    const updatedCallbacks = this.props.currentComponent.callbacks.filter(callback => callback._id !== _id)
    console.log(this.props.currentComponent)
    const component = Object.assign({}, this.props.currentComponent, { callbacks: updatedCallbacks });
    console.log('updated component:', component)
    this.props.updateComponent(component);
    this.setState({ renderEditForm: false })
  }

  editCallback =  async mutation => {
    const { name, description } = this.state;
    const { highlighted, currentComponent } = this.props;
    const { _id } = highlighted;
    console.log(_id, typeof _id)
    const setState = this.state.setState.map(field => ({
      stateField: field.stateField, 
      stateChange: field.stateChange
    }))
    
    console.log(setState)
    const functionArgs = this.state.functionArgs.map(field => ({ name: field.name, typeName: field.typeName }))
    console.log(functionArgs)

    const { data } = await mutation({ variables: { _id, name, description, functionArgs, setState } })
    console.log('data:', data);
    const callbacks = currentComponent.callbacks.map(cb => _id === cb._id ? data.editCallback : cb)
    const component = Object.assign({}, currentComponent, { callbacks });
    
    this.props.updateComponent(component);
    this.setState({ renderEditForm: false })
  }

  render() {
    const { 
      currentComponent, 
      editCallback, 
      resetHighlight, 
      setHighlight, 
      toggleForm,
      highlighted
    } = this.props;
    const {
      name, 
      description, 
      functionArgs,
      setState,
      renderEditForm
    } = this.state;
    
    const { callbacks } = currentComponent;
    
    return (
      <Mutation mutation={EDIT_CALLBACK}>
        {EditCallback => (
          // <Mutation mutation={DELETE_CALLBACK}>
            // {DeleteCallback =>  (
              renderEditForm ? 
              <div>
                <CallbackForm
                  name={name}
                  description={description}
                  functionArgs={functionArgs}
                  setState={setState}
                  handleChange={this.handleChange}
                  addElement={this.addElement}
                />
                <div
                  className="dashboard-button hideable"
                  onClick={() => this.editCallback(EditCallback)}
                >
                  <div className="button-content">UPDATE</div>
                  <div className="button-content">CALLBACK</div>
                </div>
                <div
                  className="dashboard-button hideable "
                  // onClick={() => this.deleteCallback(DeleteCallback)}
                  // onClick={() => this.deleteCallback()}
                >
                  <div className="button-content">DELETE</div>
                  <div className="button-content">CALLBACK</div>
                </div>
              </div> :
              <div>
                {callbacks.length < 1 ? 
                  ( <h3>No Callbacks To Show</h3> )
                  : 
                  ( <div>
                    <h3>Click a Callback To Edit</h3>
                    {callbacks.map((callback, index) => (
                      <div
                        style={{ 
                          fontSize: "16px", 
                          margin: "4px",
                          backgroundColor: highlighted._id === callback._id && 'rgba(0, 0, 0, 0.3)'
                        }} 
                        key={callback._id}
                        onMouseEnter={() => editCallback(callback)}
                        onMouseLeave={resetHighlight}
                        onClick={() => {
                          setHighlight(callback);
                          this.setState({ renderEditForm: true })
                        }}
                      >
                        {callback.name}
                      </div>)
                    )}
                  </div> )
                }
                <div
                  className="dashboard-button hideable add-new-callback"
                  onClick={toggleForm}
                >
                  <div className="button-content">ADD</div>
                  <div className="button-content">NEW</div>
                  <div className="button-content">CALLBACK</div>
                </div>

              </div>
            )}
          {/* </Mutation> */}
        {/* )} */}
      </Mutation>
    );
  }
}
