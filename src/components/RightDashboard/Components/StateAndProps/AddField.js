import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import Select from "react-select";
import { ADD_PROP, ADD_STATE } from "../../../../graphql/mutations";
import {
  Label,
  LabelText,
  RightDashboardTitle as Title,
  ComponentWorkingsContainer as Container
} from "styles";
import { OPTIONS } from "helpers/const";
import "./select.css";

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
    console.log(updatedComponent);
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
    const keyText = `${type.charAt(0).toUpperCase() + type.slice(1)} Key`;
    const typeText = `${type.charAt(0).toUpperCase() + type.slice(1)} Type`;

    return (
      <Mutation mutation={MUTATION}>
        {AddField => (
          <Container>
            <Title>Adding A State Field</Title>
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
              <div
                style={{
                  fontSize: "24px",
                  color: "#21c2f8",
                  height: "20px",
                  paddingBottom: 0,
                  marginBottom: 0
                }}
              >
                <Select
                  options={OPTIONS}
                  defaultValue={value2}
                  onChange={e => handleSelect(e.value, "value2")}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
            </Label>
            <button
              className="dashboard-button"
              onClick={() => this.saveField(currentComponent, AddField)}
            >
              ADD {type}
            </button>
            <button className="dashboard-button" onClick={discardField}>
              DISCARD {type}
            </button>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default AddField;
