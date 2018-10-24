import React, { Component, Fragment } from "react";
import styled from "styled-components";
import DisplayFields from "./StateAndProps/DisplayFields";
import EditField from "./StateAndProps/EditField";
import AddField from "./StateAndProps/AddField";
import NoStateAllowed from "./StateAndProps/NoStateAllowed";
import ComponentHeader from "./ComponentHeader";
import { RightDashboardTitle as Title } from "styles";
import { SubmitButton, WideButton } from "components/UI/SubmitButton";

const Button = styled(WideButton)`
  margin: 0 15%;
  width: 70%;
`;

class UpdateComponentWorkings extends Component {
  initialState = {
    value1: "",
    value2: "string",
    showAddField: false,
    highlighted: null,
    onHover: true,
    editField: null
  };

  showEdit = id =>
    this.setState({
      editField: id
    });

  hideEdit = () => {
    if (this.state.onHover) {
      this.setState({ editField: null });
    }
  };

  state = this.initialState;

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  handleSelect = (value, key) => this.setState({ [key]: value });

  displayAddField = () => this.setState({ showAddField: true });

  discardField = () => this.setState({ ...this.initialState });

  editField = field => {
    if (this.state.onHover) this.setState({ highlighted: field });
  };

  exitComponent = () => {
    const match = this.props.match.url
      .split("/")
      .slice(0, 5)
      .join("/");
    this.props.history.push(match);
  };

  resetHighlight = () => {
    if (this.state.onHover) this.setState({ highlighted: null });
  };

  setHighlight = field => {
    this.setState({ highlighted: field });
    this.setState({ onHover: false });
  };

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
    const { components } = currentProject;
    if (!components) return <Title>No Components</Title>;

    const pieces = history.location.pathname.split("/");
    const name = pieces[3];
    const index = pieces[4];
    const currentComponent = components
      .filter(c => c.name === name)
      .filter(c => c.iteration === Number(index))[0];

    if (currentComponent.style === "presentational" && type === "state")
      return <NoStateAllowed exit={this.exitComponent} />;

    return (
      <Fragment>
        <ComponentHeader currentComponent={currentComponent}>
          <SubmitButton onClick={this.exitComponent}>DONE</SubmitButton>
        </ComponentHeader>

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
            <Button onClick={this.displayAddField}>
              {`ADD A NEW ${type.toUpperCase()}`}
            </Button>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default UpdateComponentWorkings;
