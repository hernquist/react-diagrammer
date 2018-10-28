import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_CALLBACK, EDIT_CALLBACK } from '../../../../graphql/mutations'
import { RightDashboardTitle as Title } from 'styles';
import CallbackForm from './CallbackForm';
import { WideButton } from 'components/UI/SubmitButton';
import CallbackList from './CallbackList';

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

  setRenderFormTrue = () => this.setState({ renderEditForm: true })

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
      toggleForm,
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
      <Mutation mutation={EDIT_CALLBACK}>
        {EditCallback => (
          <Mutation mutation={DELETE_CALLBACK}>
            {DeleteCallback => (renderEditForm ? 
              <Fragment>
                <CallbackForm
                  argName={argName}
                  addElement={this.addElement}
                  callback={() => console.log('empty callback')}
                  description={description}
                  deleteElement={this.deleteElement}
                  functionArgs={functionArgs}
                  handleChange={this.handleChange}
                  name={name}
                  setState={setState}
                  stateChange={stateChange}
                  stateField={stateField}
                  typeName={typeName}
                  createNotification={createNotification}
                />
                <WideButton
                  onClick={() => this.updateValidation(EditCallback)}
                >
                  UPDATE CALLBACK
                </WideButton>
                <WideButton
                  onClick={() => this.deleteCallback(DeleteCallback)}
                >
                  DELETE CALLBACK
                </WideButton>
              </Fragment> :
              <Fragment>
                <Title>UPDATE CALLBACKS</Title>
                <CallbackList 
                  callbacks={callbacks}
                  setRenderFormTrue={this.setRenderFormTrue}
                  {...this.props}
                />
                <WideButton onClick={toggleForm}>
                  ADD NEW CALLBACK
                </WideButton>
              </Fragment>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}
