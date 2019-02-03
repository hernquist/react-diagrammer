import React, { Component, Fragment } from "react";
// import styled from "styled-components";
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
// import { SubmitButton, WideButton } from "components/UI/SubmitButton";
import { RightDashboardButton as Button } from "components/UI/RightDashboardButton";

// const Button = styled(WideButton)`
//   margin: 0 15%;
//   width: 70%;
// `;

class UpdateComponentWorkings extends Component {
  initialState = {
    value1: "",
    value2: "string",
    showAddField: false,
    highlighted: null,
    onHover: true,
    editField: null
  };

  state = this.initialState;

  showEdit = id => this.setState({ editField: id });

  hideEdit = () => {
    if (this.state.onHover) {
      this.setState({ editField: null });
    }
  };

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  handleSelect = (value, key) => this.setState({ [key]: value });

  displayAddField = () => this.setState({ showAddField: true });

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
      value1,
      value2,
      highlighted,
      onHover,
      editField
    } = this.state;
    const { currentProject, history, updateComponent, type } = this.props;
    const { pathname } = history.location;
    const { components } = currentProject;
    if (!components) return <Title>No Components</Title>;

    const currentComponent = helper.getComponentFromURL(pathname, components);

    if (currentComponent.style === "presentational" && type === "state")
      return <NoStateAllowed exit={this.exitComponent} />;

    return (
      <Container>
        <ComponentHeader currentComponent={currentComponent} />
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
        ) : highlighted ? (
          <EditField
            field={highlighted}
            edit={!onHover}
            reset={this.discardField}
            currentComponent={currentComponent}
            updateComponent={updateComponent}
            type={type}
          />
        ) : (
          <Fragment>
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
            <Button
              onClick={this.displayAddField}
              text={`ADD A NEW ${type.toUpperCase()}`}
            />
            <Button onClick={this.exitComponent} text="DONE" />
          </Fragment>
        )}
      </Container>
    );
  }
}

export default UpdateComponentWorkings;
