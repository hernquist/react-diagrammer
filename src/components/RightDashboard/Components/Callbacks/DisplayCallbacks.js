import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { DELETE_CALLBACK, EDIT_CALLBACK } from "../../../../graphql/mutations";
import EditCallbackForm from "./EditCallbackForm";
import CallbackList from "./CallbackList";
import ShowComponent from "../ShowComponent";
import { RightDashboardButton as Button } from "components/UI/RightDashboardButton";
import PopUp from "../../../UI/PopUp";
import { DisplayCBsButtonContainer as Buttons } from "styles";

export default class DisplayCallbacks extends Component {
  state = {
    name: "",
    description: "",
    functionArgs: [],
    setState: [],
    argName: "",
    typeName: "string",
    stateField: "",
    stateChange: "",
    showCallbacksToEdit: false,
    renderEditForm: false,
    callback: {},
    visible: true
  };

  setCallback = callback =>
    this.setState({
      name: callback.name,
      description: callback.description,
      functionArgs: callback.functionArgs,
      setState: callback.setState,
      callback: callback
    });

  handleShowCallbacksToEdit = () =>
    this.setState({ showCallbacksToEdit: true });

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  handleClear = key => this.setState({ [key]: "" });

  handleSelect = (value, key) => this.setState({ [key]: value });

  addElement = key => {
    const {
      argName,
      typeName,
      functionArgs,
      stateField,
      stateChange,
      setState
    } = this.state;
    
    key === "functionArgs" &&
      this.setState({
        functionArgs: [...functionArgs, { name: argName, typeName }],
        argName: "",
        typeName: ""
      });
    key === "setState" &&
      this.setState({
        setState: [...setState, { stateField, stateChange }],
        stateField: "",
        stateChange: ""
      });
  };

  deleteCallback = async mutation => {
    const { _id } = this.state.callback;
    const { data } = await mutation({ variables: { _id } });

    if (data.deleteCallback) {
      const updatedCallbacks = this.props.currentComponent.callbacks.filter(
        callback => callback._id !== _id
      );
      const component = Object.assign({}, this.props.currentComponent, {
        callbacks: updatedCallbacks
      });
      this.props.updateComponent(component);
    }

    this.setState({ renderEditForm: false });
  };

  updateValidation = mutation => {
    const { createNotification } = this.props;
    const { name } = this.state;
    let message, title, details;

    switch (true) {
      case name.length === 0:
        message = "emptyField";
        details = "Callback name";
        break;
      case name.length < 3:
        message = "minimumLength";
        details = "callback name";
        break;
      default:
        message = false;
        break;
    }

    message
      ? createNotification("warning", message, title, details)()
      : this.editCallback(mutation);
  };

  setRenderFormTrue = () => this.setState({ renderEditForm: true });

  editCallback = async mutation => {
    const { name, description, callback } = this.state;
    const {
      currentComponent,
      resetUpdateCallbacks,
      updateComponent
    } = this.props;
    const { _id } = callback;

    const setState = this.state.setState.map(field => ({
      stateField: field.stateField,
      stateChange: field.stateChange
    }));

    const functionArgs = this.state.functionArgs.map(field => ({
      name: field.name,
      typeName: field.typeName
    }));

    const { data } = await mutation({
      variables: { _id, name, description, functionArgs, setState }
    });

    const callbacks = currentComponent.callbacks.map(cb =>
      _id === cb._id ? data.editCallback : cb
    );

    const component = Object.assign({}, currentComponent, { callbacks });
    updateComponent(component);
    resetUpdateCallbacks();
    this.setState({ renderEditForm: false });
  };

  deleteElement = (field, key) => {
    const elements = this.state[key];
    const updatedElements = elements.filter(element => element !== field);
    this.setState({ [key]: updatedElements });
  };

  closePopUp = () => this.setState({ visible: false });

  render() {
    const { currentComponent, toggleForm, createNotification } = this.props;
    const {
      argName,
      callback,
      description,
      functionArgs = [],
      name,
      renderEditForm,
      setState = [],
      showCallbacksToEdit,
      stateChange,
      stateField,
      typeName,
      visible
    } = this.state;
    const { callbacks } = currentComponent;

    let updatedCallbacks = {
      _id: callback._id,
      name,
      description,
      functionArgs: [...functionArgs, argName && { name: argName, typeName }],
      setState: [...setState, { stateField: stateField, stateChange }]
    };

    return (
      <Fragment>
        <PopUp visible={visible} toggle={this.closePopUp}>
          <ShowComponent
            updatedCallbacks={updatedCallbacks}
            type="callback"
            {...this.props}
          />
        </PopUp>
        <Mutation mutation={EDIT_CALLBACK}>
          {EditCallback => (
            <Mutation mutation={DELETE_CALLBACK}>
              {DeleteCallback =>
                renderEditForm ? (
                  <Fragment>
                    <EditCallbackForm
                      addElement={this.addElement}
                      argName={argName}
                      callback={callback}
                      currentComponent={currentComponent}
                      createNotification={createNotification}
                      deleteElement={this.deleteElement}
                      description={description}
                      functionArgs={functionArgs}
                      handleChange={this.handleChange}
                      handleClear={this.handleClear}
                      handleSelect={this.handleSelect}
                      name={name}
                      setState={setState}
                      stateChange={stateChange}
                      stateField={stateField}
                      typeName={typeName}
                    />
                    <Buttons style={{ height: "120px" }}>
                      <Button
                        onClick={() => this.updateValidation(EditCallback)}
                        text="UPDATE CALLBACK"
                      />
                      <Button
                        onClick={() => this.deleteCallback(DeleteCallback)}
                        text="DELETE CALLBACK"
                      />
                    </Buttons>
                  </Fragment>
                ) : (
                  <Fragment>
                    {showCallbacksToEdit ? (
                      <CallbackList
                        callbacks={callbacks}
                        setCallback={this.setCallback}
                        setRenderFormTrue={this.setRenderFormTrue}
                      />
                    ) : (
                      <Fragment>
                        <Button
                          onClick={this.handleShowCallbacksToEdit}
                          text="UPDATE CALLBACKS"
                        />
                        <Button onClick={toggleForm} text="ADD NEW CALLBACK" />
                      </Fragment>
                    )}
                  </Fragment>
                )
              }
            </Mutation>
          )}
        </Mutation>
      </Fragment>
    );
  }
}
