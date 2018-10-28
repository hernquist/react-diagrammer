import React, { Component, Fragment } from 'react'
import DisplayCallbacks from './Callbacks/DisplayCallbacks';
import CallbackForm from './Callbacks/CallbackForm';
import { Mutation } from 'react-apollo';
import { ADD_CALLBACK } from '../../../graphql/mutations';
import helper from "helpers/helper";
import { 
  RightDashboardTitle as Title,
  ComponentWorkingsContainer as Container

} from "styles";
import ComponentHeader from "./ComponentHeader";
import { SubmitButton } from "components/UI/SubmitButton";

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

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  handleClear = key => this.setState({ [key]: ''})

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
    const component = Object.assign(
      {}, 
      currentComponent, 
      { callbacks: [...currentComponent.callbacks, data.addCallback]}
    );
    this.props.updateComponent(component);
    this.setState( this.initialState )
    this.toggleForm()
  }

  toggleForm = () => this.setState({ renderForm: !this.state.renderForm })

  editCb = cb => {
    if (this.state.onHover) this.setState({ highlighted: cb });
  };

  resetHighlight = () => {
    if (this.state.onHover) this.setState({ highlighted: { _id: null } });
  };

  setHighlight = cb => {
    const { highlighted, onHover} = this.state;
    cb._id === highlighted._id && !onHover ? 
      this.setState({ onHover: true, highlighted: { _id: null } }) :
      this.setState({ onHover: false, highlighted: cb });
  }
  
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
    const { currentProject, history, updateComponent, createNotification } = this.props;
    const { pathname } = history.location;
    const { components } = currentProject;
    if (!components) return <Title>No Components</Title>;

    const currentComponent = helper.getComponentFromURL(pathname, components);
  
    return (
      <Container>
        <ComponentHeader currentComponent={currentComponent}>
          <SubmitButton onClick={this.exitComponent}>DONE</SubmitButton>
        </ComponentHeader>
        {renderForm ? 
          <Mutation mutation={ADD_CALLBACK}>
            {AddCallback => (
              <CallbackForm
                addElement={this.addElement}
                argName={argName}
                callback={this.saveCallback}
                create={true}
                createNotification={createNotification}
                currentComponent={currentComponent}
                description={description} 
                functionArgs={functionArgs}
                handleChange={this.handleChange}
                handleClear={this.handleClear}
                mutation={AddCallback}
                name={name}
                setState={setState}
                stateChange={stateChange}
                stateField={stateField}
                typeName={typeName}
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
            createNotification={createNotification}
          />
        }
      </Container>
    )
  }
}