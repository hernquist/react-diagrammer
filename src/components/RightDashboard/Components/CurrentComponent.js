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
import ModalContainer from "../../UI/ModalContainer";
import UnassignComponent from "./UnassignComponent";

const Button = styled(WideButton)`
  width: 90%;
  margin: 3% 5% 2% 5%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

class CurrentComponent extends Component {
  updateStyle = async ({ _id }, mutation) => {
    const { data } = await mutation({ variables: { _id } });
    this.props.updateComponent(data.toggleComponentStyle);
  };

  render() {
    const { currentProject, history, updateComponent } = this.props;
    const pieces = history.location.pathname.split("/");
    const name = pieces[3];
    const index = pieces[4];

    const { components } = currentProject;
    if (!components) {
      return <div>No Components</div>;
    }

    const currentComponent = helper.currComp(components, name, index);
    const isPresentational = currentComponent.style === "presentational";
    const isUnassigned = currentComponent.placement === "unassigned";
    // later will add some functionality for unassigning a root, although oof
    const isRoot = currentComponent.placement === "root";
    console.log(currentComponent);
    const buttonText = `${isUnassigned ? `ASSIGN` : `UNASSIGN`} COMPONENT`;

    return (
      <Container>
        <Title>
          <div>{currentComponent.style.toUpperCase()}</div>
          <div>COMPONENT</div>
          <div>{`${currentComponent.name}.js`}</div>
        </Title>
        <Button
          disabled={isPresentational}
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
          disabled={isPresentational}
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
        {/* <Button
          disabled={isRoot}
          onClick={() =>
            this.props.history.push(
              this.props.match.url +
                `/${isUnassigned ? `` : `un`}assign-component`
            )
          }
        >
          {!isUnassigned && `UN`}
          ASSIGN COMPONENT
        </Button> */}
        <ModalContainer text={buttonText} button={Button} disabled={isRoot}>
          <UnassignComponent
            updateComponent={updateComponent}
            currentProject={currentProject}
            history={history}
          />
        </ModalContainer>
      </Container>
    );
  }
}

export default CurrentComponent;
