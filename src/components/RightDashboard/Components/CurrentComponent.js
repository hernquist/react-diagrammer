import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import { TOGGLE_COMPONENT_STYLE } from "../../../graphql/mutations";
import helper from "../../../helpers/helper";
import {
  RightDashboardContainer as Container,
  CurrentComponentTitle as Title
} from "styles";
import { WideButton } from "../../UI/SubmitButton";

const Button = styled(WideButton)`
  margin: 10px 0;
`;

class CurrentComponent extends Component {
  updateStyle = async ({ _id }, mutation) => {
    const { data } = await mutation({ variables: { _id } });
    this.props.updateComponent(data.toggleComponentStyle);
  };

  render() {
    const { currentProject, history } = this.props;
    const pieces = history.location.pathname.split("/");
    const name = pieces[3];
    const index = pieces[4];

    const { components } = currentProject;
    if (!components) {
      return <div>No Components</div>;
    }

    const currentComponent = helper.currComp(components, name, index);

    return (
      <Container>
        <Title>
          <div>{currentComponent.style.toUpperCase()}</div>
          <div>COMPONENT</div>
          <div>{`${currentComponent.name}.js`}</div>
        </Title>
        <Button
          onClick={() =>
            this.props.history.push(this.props.match.url + "/update-state")
          }
        >
          UPDATE STATE
        </Button>
        <Button
          onClick={() =>
            this.props.history.push(this.props.match.url + "/update-props")
          }
        >
          UPDATE INCOMING PROPS
        </Button>
        <Button
          onClick={() =>
            this.props.history.push(this.props.match.url + "/update-callbacks")
          }
        >
          UPDATE CALLBACKS
        </Button>
        <Mutation mutation={TOGGLE_COMPONENT_STYLE}>
          {ToggleComponentStyle => (
            <Button
              onClick={() =>
                this.updateStyle(currentComponent, ToggleComponentStyle)
              }
            >
              TOGGLE COMPONENT TYPE
            </Button>
          )}
        </Mutation>
        <Button
          onClick={() =>
            this.props.history.push(this.props.match.url + "/edit-name")
          }
        >
          EDIT NAME
        </Button>
      </Container>
    );
  }
}

export default CurrentComponent;
