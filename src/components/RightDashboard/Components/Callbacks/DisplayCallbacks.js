import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_CALLBACK, EDIT_CALLBACK } from '../../../../graphql/mutations'
import { 
  RightDashboardTitle as Title,
  Message 
 } from 'styles';
import CallbackForm from './CallbackForm';
import { WideButton } from 'components/UI/SubmitButton';

export default class DisplayCallbacks extends Component {
  state = {
    argName: '',
    typeName: '',
    stateField: '',
    stateChange: '',
  }
  
  static getDerivedStateFromProps(props, prevState) {
    let state;
    if (prevState.name === undefined) {
      state = {
        name: props.highlighted.name,
        description: props.highlighted.description,
        functionArgs: props.highlighted.functionArgs,
        setState: props.highlighted.setState,
        renderEditForm: false
      }
    }
    return {...prevState, ...state };
  }

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  handleClear = key => this.setState({ [key]: ''});
  
  addElement = key => {
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
    // TODO should be based on data variable
    const updatedCallbacks = this.props.currentComponent.callbacks.filter(callback => callback._id !== _id)
    const component = Object.assign({}, this.props.currentComponent, { callbacks: updatedCallbacks });
    this.props.updateComponent(component);
    this.setState({ renderEditForm: false })
  }

  updateValidation = (mutation) => {
    const { createNotification } = this.props;
    const { name } = this.state;
    let message, title, details;

    switch (true) {
      case name.length === 0:
        message = 'emptyField';
        details = 'Callback name';
        break;
      case name.length < 3:
        message = 'minimumLength';
        details = 'callback name';
        break;
      default:
        message = false;
        break;
    };

    message ? createNotification('warning', message, title, details)()
      : this.editCallback(mutation)
  }

  editCallback = async mutation => {
    const { name, description } = this.state;
    const { highlighted, currentComponent, resetUpdateCallbacks, updateComponent } = this.props;
    const { _id } = highlighted;
    const setState = this.state.setState.map(field => ({
      stateField: field.stateField, 
      stateChange: field.stateChange
    }))

    const functionArgs = this.state.functionArgs.map(field => ({ name: field.name, typeName: field.typeName }))

    const { data } = await mutation({ variables: { _id, name, description, functionArgs, setState } })
    const callbacks = currentComponent.callbacks.map(cb => _id === cb._id ? data.editCallback : cb)
    const component = Object.assign({}, currentComponent, { callbacks });
    
    updateComponent(component);
    resetUpdateCallbacks();
    this.setState({ renderEditForm: false });
  }

  deleteElement = (field, key) => {
    const elements = this.state[key];
    const updatedElements = elements.filter(element => element !== field )
    this.setState({ [key]: updatedElements })
  }

  render() {
    const { 
      currentComponent, 
      editCb, 
      resetHighlight, 
      setHighlight, 
      toggleForm,
      highlighted,
      createNotification
    } = this.props;
    const {
      name, 
      description, 
      functionArgs,
      setState,
      renderEditForm,
      argName,
      typeName,
      stateChange,
      stateField
    } = this.state;
    const { callbacks } = currentComponent;
    
    return (
      <Fragment>
        <Title>UPDATE CALLBACKS</Title>
        <Mutation mutation={EDIT_CALLBACK}>
          {EditCallback => (
            <Mutation mutation={DELETE_CALLBACK}>
              {DeleteCallback =>  (
                renderEditForm ? 
                  <Fragment>
                    <CallbackForm
                      name={name}
                      callback={() => console.log("callback from DisplayCallbacks")}
                      description={description}
                      functionArgs={functionArgs}
                      setState={setState}
                      handleChange={this.handleChange}
                      addElement={this.addElement}
                      argName={argName}
                      typeName={typeName}
                      stateField={stateField}
                      stateChange={stateChange}
                      deleteElement={this.deleteElement}
                      createNotification={createNotification}
                      />
                    <div
                      className="dashboard-button hideable"
                      onClick={() => this.updateValidation(EditCallback)}
                      >
                      <div className="button-content">UPDATE</div>
                      <div className="button-content">CALLBACK</div>
                    </div>
                    <div
                      className="dashboard-button hideable "
                      onClick={() => this.deleteCallback(DeleteCallback)}
                      >
                      <div className="button-content">DELETE</div>
                      <div className="button-content">CALLBACK</div>
                    </div>
                  </Fragment> :
                  <Fragment>
                  
                  {callbacks.length < 1 ? 
                    ( <Message>No Callbacks To Show</Message> )
                    : 
                    ( <Fragment>
                      <Message>Click a Callback To Edit</Message>
                      {callbacks.map(callback => (
                        <div
                        style={{ 
                          fontSize: "16px", 
                          margin: "4px",
                          backgroundColor: highlighted._id === callback._id && 'rgba(0, 0, 0, 0.3)'
                        }} 
                        key={callback._id}
                        onMouseEnter={() => editCb(callback)}
                        onMouseLeave={resetHighlight}
                        onClick={() => {
                          setHighlight(callback);
                          this.setState({ renderEditForm: true })
                        }}
                        >
                            {callback.name}
                          </div>)
                        )}
                        </Fragment> )
                      }
                  <WideButton onClick={toggleForm}>
                    ADD NEW CALLBACK
                  </WideButton>
                </Fragment>
              )}
            </Mutation>
          )}
        </Mutation>
      </Fragment>
    );
  }
}
