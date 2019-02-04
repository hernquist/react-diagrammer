import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { TOGGLE_COMPONENT_STYLE } from "../../../graphql/mutations";
import helper from "../../../helpers/helper";
import ModalContainer from "../../UI/ModalContainer";
import ComponentHeader from "./ComponentHeader";
import EditComponentName from "./EditComponentName";
import { RightDashboardContainer as Container } from "styles";
import { RightDashboardButton as Button } from "../../UI/RightDashboardButton";
import ShowComponent from "./ShowComponent";

class CurrentComponent extends Component {
  updateStyle = async ({ _id }, mutation) => {
    const { data } = await mutation({ variables: { _id } });
    this.props.updateComponent(data.toggleComponentStyle);
  };

  handleClick = (disabled, type) => {
    const { history, match, createNotification } = this.props;
    if (disabled) {
      createNotification("warning", type, "isPresentational")();
    } else {
      history.push(match.url + `/${type}`);
    }
  };

  handleIsRootClick = (disabled, type) => {
    const { history, match, createNotification } = this.props;
    if (disabled) {
      createNotification("warning", type, "isRoot")();
    } else {
      history.push(match.url + `/${type}`);
    }
  };

  render() {
    const { currentProject, history, match } = this.props;
    const { pathname } = history.location;
    const { components } = currentProject;
    if (!components) return <div>No Components</div>;

    const currentComponent = helper.getComponentFromURL(pathname, components);
    if (!currentComponent) return null;

    const isPresentational = currentComponent.style === "presentational";
    const isUnassigned = currentComponent.placement === "unassigned";
    const isRoot = currentComponent.placement === "root";
    const buttonText = `${isUnassigned ? `ASSIGN` : `UNASSIGN`} COMPONENT`;
    const toggleText = `MAKE ${
      isPresentational ? `CONTAINER` : `PRESENTATIONAL`
    }`;
    const buttonClass = isPresentational && "disabled-button";
    const assignation = `${isUnassigned ? `` : `un`}assign-component`;

    return (
      <Container>
        <ComponentHeader currentComponent={currentComponent} />
        <Button
          className={buttonClass}
          onClick={() => this.handleClick(isPresentational, "update-state")}
          text={"UPDATE STATE"}
        />
        <Button
          onClick={() => history.push(match.url + "/update-props")}
          text={"UPDATE INCOMING PROPS"}
        />
        <Button
          className={buttonClass}
          onClick={() => this.handleClick(isPresentational, "update-callbacks")}
          text={"UPDATE CALLBACKS"}
        />
        <Mutation mutation={TOGGLE_COMPONENT_STYLE}>
          {ToggleComponentStyle => (
            <Button
              onClick={() =>
                this.updateStyle(currentComponent, ToggleComponentStyle)
              }
              text={toggleText}
            />
          )}
        </Mutation>
        <ModalContainer text={"EDIT NAME"} button={Button}>
          <EditComponentName {...this.props} />
        </ModalContainer>
        <Button
          className={isRoot && "disabled-button"}
          onClick={() => this.handleIsRootClick(isRoot, assignation)}
          text={buttonText}
        />
        <ModalContainer text={"COMPONENT DETAILS"} button={Button} large>
          <ShowComponent {...this.props} />
        </ModalContainer>
      </Container>
    );
  }
}

export default CurrentComponent;
