import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { ADD_PROP, ADD_STATE } from "../../../../graphql/mutations";
import TypeOptions from "./TypeOptions";
import {
  Label,
  LabelText,
  Buttons,
  ComponentWorkingsContainer as Container
} from "styles";
import styled from "styled-components";
import { RightDashboardButton as Button } from "../../../UserInterface/RightDashboardButton";

const ButtonsContainer = styled(Buttons)`
  margin: 10px 0;
  width: 200px;
`;

class AddField extends Component {
  mutationProp = async (currentComponent, mutation) => {
    const componentId = currentComponent._id;
    const prop = {
      componentId,
      name: this.props.value1,
      proptype: this.props.value2
    };
    const { data } = await mutation({ variables: { prop } });
    const props = data.addProp.props.map(prop => ({ ...prop, componentId }));
    return Object.assign({}, currentComponent, { props });
  };

  mutationState = async (currentComponent, mutation) => {
    const componentId = currentComponent._id;
    const state = {
      componentId,
      name: this.props.value1,
      statetype: this.props.value2
    };
    const { data } = await mutation({ variables: { state } });
    const stateObjects = data.addState.state.map(stateItem => ({
      ...stateItem,
      componentId
    }));
    return Object.assign({}, currentComponent, { state: stateObjects });
  };

  saveField = async (currentComponent, mutation) => {
    const updatedComponent =
      this.props.type === "state"
        ? await this.mutationState(currentComponent, mutation)
        : await this.mutationProp(currentComponent, mutation);
    this.props.updateComponent(updatedComponent);
    this.props.discardField();
  };

  render() {
    const {
      type,
      currentComponent,
      value1,
      value2,
      handleChange,
      handleSelect,
      discardField
    } = this.props;
    const MUTATION = type === "state" ? ADD_STATE : ADD_PROP;
    const placeholder =
      type === "state" ? "add a state key..." : "add a prop key...";
    const title = type.charAt(0).toUpperCase() + type.slice(1);
    const keyText = `${title} Key`;
    const typeText = `${title} Type`;

    return (
      <Mutation mutation={MUTATION}>
        {AddField => (
          <Container>
            <Label>
              <LabelText>{keyText}</LabelText>
              <input
                onChange={e => handleChange(e, "value1")}
                value={value1}
                placeholder={placeholder}
              />
            </Label>
            <Label>
              <LabelText>{typeText}</LabelText>
              <TypeOptions
                handleSelect={handleSelect}
                key="value2"
                fieldtype={"value2"}
                selected={value2}
              />
            </Label>
            <ButtonsContainer>
              {/* TODO add notification to make sure their are no duplicates, and other more complicated notifcations */}
              <Button
                disabled={value1.length === 0}
                onClick={() => this.saveField(currentComponent, AddField)}
                text={"SAVE"}
              />
              <Button
                className="dashboard-button"
                onClick={discardField}
                text={"CANCEL"}
              />
            </ButtonsContainer>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default AddField;
