import React, { Component } from 'react'
import DisplayCallbacks from './Callbacks/DisplayCallbacks';
import CallbackForm from './Callbacks/CallbackForm';

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
    // showAddField: false,
    highlighted: null,
    onHover: true,
  }

  state = this.initialState;

  handleChange = (e, key) => {
    console.log(e, key);
    this.setState({ [key]: e.target.value });
  }

  addElement = key => {
    const { argName, typeName, stateField, stateChange } = this.state;
    key === 'functionArgs' && this.setState({
      [key]: [...this.state.functionArgs, {argName, typeName}], 
      argName: "",
      typeName: ""
    })
    key === 'setState'
  }

  // displayAddField = () => this.setState({ showAddField: true });

  // discardField = () => this.setState({ ...this.initialState });

  // editField = field => {
  //   if (this.state.onHover) this.setState({ highlighted: field });
  // };

  // exitComponent = () => {
  //   const match = this.props.match.url.split("/").slice(0, 5).join("/");
  //   this.props.history.push(match);
  // }

  // resetHighlight = () => {
  //   if (this.state.onHover) this.setState({ highlighted: null });
  // };

  // setHighlight = () => this.setState({ onHover: false });

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
      onHover, 
    } = this.state;
    const { currentProject, history, updateComponent } = this.props;
    const { components } = currentProject;
    if (!components) return <div>No Components</div>

    const pieces = history.location.pathname.split("/");
    const pathname = pieces[3];
    const index = pieces[4];
    const currentComponent = components
      .filter(c => c.name === pathname)
      .filter(c => c.iteration === Number(index))[0];

    return (
      <div>

        <DisplayCallbacks 
          currentComponent={currentComponent}
          editCallback={this.editCallback}
          resetHighlight={this.resetHighlight}
          setHighlight={this.setHighlight}
        />

        <CallbackForm
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
        />
  
      </div>
    )
  }
}
