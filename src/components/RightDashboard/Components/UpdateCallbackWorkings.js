import React, { Component } from 'react'
import DisplayCallbacks from './Callbacks/DisplayCallbacks';
import CallbackForm from './Callbacks/CallbackForm';
import { Mutation } from 'react-apollo';
import { ADD_CALLBACK } from '../../../graphql/mutations';

export default class UpdateCallbackWorkings extends Component {
  initialState = {
    name: "",
    description: "",
    functionArgs: [],
    argName: "",
    typeName: "",
    setState: [],
    stateField: "",
    stateChange: "",
  }

  state = {
    ...this.initialState, 
    highlighted: { _id: null },
    onHover: true,
    renderForm: false
  }

  handleChange = (e, key) => {
    console.log(e.target.value, key);
    this.setState({ [key]: e.target.value });
  }

  addElement = key => {
    const { argName, typeName, functionArgs, stateField, stateChange, setState } = this.state;
    key === 'functionArgs' && this.setState({
      functionArgs: [...functionArgs, {name: argName, typeName}], 
      argName: "",
      typeName: ""
    })
    key === 'setState' && this.setState({
      setState: [...setState, { stateField, stateChange }],
      stateField: "",
      stateChange: ""
    })
  }

  deleteElement = (field, key) => {
    const elements = this.state[key];
    const updatedElements = elements.filter(element => element !== field)
    this.setState({ [key]: updatedElements })
  }

  saveCallback = async (currentComponent, mutation) => {
    const { name, description, functionArgs, setState } = this.state;
    const componentId = currentComponent._id;
    const callback = {
      componentId, 
      name,
      description,
      functionArgs,
      setState
    }
    const { data } = await mutation({  variables: { callback }})
    const component = Object.assign({}, currentComponent, { callbacks: [...currentComponent.callbacks, data.addCallback] });
    this.props.updateComponent(component);
    this.setState( this.initialState )
    this.toggleForm()
  }

  toggleForm = () => {
    this.setState({ renderForm: !this.state.renderForm })
  }

  editCb = cb => {
    if (this.state.onHover) this.setState({ highlighted: cb });
  };

  resetHighlight = () => {
    if (this.state.onHover) this.setState({ highlighted: { _id: null } });
  };

  setHighlight = cb => cb._id === this.state.highlighted._id && this.state.onHover === false ? 
    this.setState({ onHover: true, highlighted: { _id: null } }) :
    this.setState({ onHover: false, highlighted: cb });
  
  resetUpdateCallbacks = () => {
    this.setState({ onHover: true });
    this.resetHighlight();
  }

  render() {
    const { 
      name, 
      description, 
      functionArgs, 
      argName,
      typeName,
      setState,
      stateField,
      stateChange,
      highlighted,
      renderForm
    } = this.state;
    const { currentProject, history, updateComponent } = this.props;
    const { components } = currentProject;
    if (!components) return <div>No Components</div>

    console.log('ADD_CALLBACK', ADD_CALLBACK)

    const pieces = history.location.pathname.split("/");
    const pathname = pieces[3];
    const index = pieces[4];
    const currentComponent = components
      .filter(c => c.name === pathname)
      .filter(c => c.iteration === Number(index))[0];

    return (
      <div>
        {renderForm ? 
          <Mutation mutation={ADD_CALLBACK}>
            {AddCallback => (
              <CallbackForm
                currentComponent={currentComponent}
                callback={this.saveCallback}
                mutation={AddCallback}
                handleChange={this.handleChange}
                addElement={this.addElement}
                name={name}
                description={description} 
                functionArgs={functionArgs}
                argName={argName}
                typeName={typeName}
                setState={setState}
                stateField={stateField}
                stateChange={stateChange}
                create={true}
              />
            )}
          </Mutation> : 
          <DisplayCallbacks 
            currentComponent={currentComponent}
            updateComponent={updateComponent}
            editCb={this.editCb}
            resetUpdateCallbacks={this.resetUpdateCallbacks}
            resetHighlight={this.resetHighlight}
            setHighlight={this.setHighlight}
            toggleForm={this.toggleForm}
            highlighted={highlighted}
          />
        }
      </div>
    )
  }
}
