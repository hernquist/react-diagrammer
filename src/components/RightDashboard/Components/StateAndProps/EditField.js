import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import {
  DELETE_PROP,
  EDIT_PROP,
  DELETE_STATE,
  EDIT_STATE
} from "graphql/mutations";
import TypeOptions from "./TypeOptions";
import { RightDashboardButton } from "components/UI/RightDashboardButton";
import {
  Label,
  LabelText,
  Buttons,
  ComponentWorkingsContainer as Container
} from "styles";

const ButtonsContainer = styled(Buttons)`
  margin: 10px 0;
  width: 270px;
`;

const Button = styled(RightDashboardButton)`
  margin: 2px;
`;

class EditField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: props.field,
      showSelector: false
    };
  }

  deactivateSelector = () => this.setState({ showSelector: false });

  activateSelector = () => this.setState({ showSelector: true });

  handleChange = (e, key) => {
    this.setState({ field: { ...this.state.field, [key]: e.target.value } });
  };

  handleSelect = (value, key) =>
    this.setState({ field: { ...this.state.field, [key]: value } });

  updateWithProps = (id, currentComponent, data) => {
    const props = currentComponent.props.map(prop =>
      id === prop._id ? data.editProp : prop
    );
    return Object.assign({}, currentComponent, { props });
  };

  updateWithState = (id, currentComponent, data) => {
    const state = currentComponent.state.map(s =>
      id === s._id ? data.editState : s
    );
    return Object.assign({}, currentComponent, { state });
  };

  updateField = async (_id, mutation) => {
    const { name, proptype, statetype } = this.state.field;
    const { type, currentComponent } = this.props;
    const { data } =
      type === "state"
        ? await mutation({ variables: { _id, name, statetype } })
        : await mutation({ variables: { _id, name, proptype } });
    const updatedComponent =
      type === "state"
        ? await this.updateWithState(_id, currentComponent, data)
        : await this.updateWithProps(_id, currentComponent, data);

    this.props.updateComponent(updatedComponent);
    this.props.reset();
  };

  deleteField = async (_id, mutation) => {
    const { data } = await mutation({ variables: { _id } });
    if (data.deleteProp || data.deleteState) {
      const { currentComponent, type } = this.props;
      let updatedComponent;
      if (type === "state") {
        const state = currentComponent.state.filter(s => _id !== s._id);
        updatedComponent = Object.assign({}, currentComponent, { state });
      } else if (type === "props") {
        const props = currentComponent.props.filter(prop => _id !== prop._id);
        updatedComponent = Object.assign({}, currentComponent, { props });
      }
      this.props.updateComponent(updatedComponent);
      this.props.reset();
    } else {
      console.log("Delete not working!");
    }
  };

  render() {
    const { field, showSelector } = this.state;
    const { type, reset } = this.props;
    const { _id } = field;
    const fieldtype = type === "state" ? "statetype" : "proptype";
    const EDIT = type === "state" ? EDIT_STATE : EDIT_PROP;
    const DELETE = type === "state" ? DELETE_STATE : DELETE_PROP;
    const keyText = `${type.charAt(0).toUpperCase() + type.slice(1)} Key`;
    const typeText = `${type.charAt(0).toUpperCase() + type.slice(1)} Type`;

    return (
      <Mutation mutation={EDIT}>
        {Edit => (
          <Mutation mutation={DELETE}>
            {Delete => (
              <Container>
                <Label>
                  <LabelText>{keyText}</LabelText>
                  <input
                    onChange={e => this.handleChange(e, "name")}
                    value={field.name}
                    placeholder={field.name}
                  />
                </Label>
                <Label
                  onClick={this.activateSelector}
                  onMouseLeave={this.deactivateSelector}
                >
                  <LabelText>{typeText}</LabelText>
                  <TypeOptions
                    handleSelect={this.handleSelect}
                    fieldtype={fieldtype}
                    selected={field.statetype}
                  />
                </Label>
                <ButtonsContainer>
                  <Button
                    onClick={() => this.updateField(_id, Edit)}
                    text={"UPDATE"}
                  />
                  <Button
                    onClick={() => this.deleteField(_id, Delete)}
                    text={"DELETE"}
                  />
                  <Button onClick={reset} text={"CANCEL"} />
                </ButtonsContainer>
              </Container>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default EditField;
