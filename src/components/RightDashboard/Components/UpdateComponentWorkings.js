import React, { Component, Fragment } from "react";
import DisplayFields from "./StateAndProps/DisplayFields";
import EditField from "./StateAndProps/EditField";
import AddField from "./StateAndProps/AddField";
import NoStateAllowed from "./StateAndProps/NoStateAllowed";
import ComponentHeader from "./ComponentHeader";
import helper from "helpers/helper";
import {
  RightDashboardTitle as Title,
  ComponentWorkingsContainer as Container
} from "styles";
import PopUp from "../../Ui/PopUp";
import { RightDashboardButton as Button } from "components/Ui/RightDashboardButton";
import ShowComponent from "./ShowComponent";

class UpdateComponentWorkings extends Component {
  initialState = {
    value1: "",
    value2: "string",
    showAddField: false,
    showEditFields: false,
    highlighted: null,
    onHover: true,
    editField: null,
  };

  constructor(props){
    super(props);

    this.state = {
      ...this.initialState,
      popUp: props.type
    }
  }

  showEdit = id => this.setState({ editField: id });

  hideEdit = () => {
    if (this.state.onHover) {
      this.setState({ editField: null });
    }
  };

  closePopUp = () => this.setState({ popUp: "" });

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  handleSelect = (value, key) => this.setState({ [key]: value });

  displayAddField = () =>
    this.setState({
      showAddField: true,
      showEditFields: false
    });

  editFields = () =>
    this.setState({
      showEditFields: true,
      showAddField: false
    });

  discardField = () => this.setState({ ...this.initialState });

  editField = field => {
    if (this.state.onHover) this.setState({ highlighted: field });
  };

  exitComponent = () => {
    const { url } = this.props.match;
    const match = helper.trimURL(url, 5);
    this.props.history.push(match);
  };

  resetHighlight = () => {
    if (this.state.onHover) this.setState({ highlighted: null });
  };

  setHighlight = field =>
    this.setState({
      highlighted: field,
      onHover: false
    });

  render() {
    const {
      showAddField,
      showEditFields,
      value1,
      value2,
      highlighted,
      onHover,
      editField,
      popUp
    } = this.state;
    const { currentProject, history, updateComponent, type } = this.props;
    const { pathname } = history.location;
    const { components } = currentProject;
    if (!components) return <Title>No Components</Title>;

    const currentComponent = helper.getComponentFromURL(pathname, components);

    if (currentComponent.style === "presentational" && type === "state")
      return <NoStateAllowed exit={this.exitComponent} />;
    
    let updatedState = null; 
    let updatedProps = null;

    if (popUp === "state") {
       updatedState = showAddField
      ? {
          name: value1,
          statetype: value2
        }
      : null;
      } else if (popUp === "prop") {
        updatedProps = showAddField 
        ? {
          name: value1,
          proptype: value2
        } : null;
      }

    const visible = popUp === "state" || popUp === "prop";

    const typeCheck = type === "prop" ? "props" : type; 
    const showEditButton = currentComponent[typeCheck].length > 0;

    return (
      <Container>
        <ComponentHeader currentComponent={currentComponent} />
        <PopUp visible={visible} toggle={this.closePopUp}>
          <ShowComponent 
            {...this.props} 
            updatedState={updatedState} 
            updatedProps={updatedProps}
          />
        </PopUp>
        {showAddField ? (
          <AddField
            type={type}
            currentComponent={currentComponent}
            updateComponent={updateComponent}
            handleChange={this.handleChange}
            handleSelect={this.handleSelect}
            discardField={this.discardField}
            value1={value1}
            value2={value2}
          />
        ) : showEditFields ? (
          highlighted ? (
            <EditField
              field={highlighted}
              edit={!onHover}
              reset={this.discardField}
              currentComponent={currentComponent}
              updateComponent={updateComponent}
              type={type}
            />
          ) : (
            <DisplayFields
              currentComponent={currentComponent}
              updateComponent={updateComponent}
              editField={editField}
              showEdit={this.showEdit}
              hideEdit={this.hideEdit}
              resetHighlight={this.resetHighlight}
              setHighlight={this.setHighlight}
              onHover={onHover}
              type={type}
            />
          )
        ) : (
          <Fragment>
            <Button
              onClick={this.displayAddField}
              text={`ADD A NEW ${type.toUpperCase()}`}
            />
            <Button
              visible={showEditButton}
              onClick={this.editFields}
              text={`EDIT ${type.toUpperCase()}`}
            />
            <Button onClick={this.exitComponent} text="DONE" />
          </Fragment>
        )}
      </Container>
    );
  }
}

export default UpdateComponentWorkings;
