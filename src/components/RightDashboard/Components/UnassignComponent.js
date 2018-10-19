import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { UNASSIGN_COMPONENT } from "graphql/mutations";
import helper from "helpers/helper";
import { SubmitButton } from "../../UI/SubmitButton";
import { UnassignedPrompt as Prompt, Buttons } from "styles";

export default class UnassignComponent extends Component {
  updateComponent = (mutation, component) => async () => {
    const { updateComponent, currentProject, closeModal } = this.props;
    const { _id } = component;
    const { components } = currentProject;
    const parent = components.filter(component =>
      component.children.some(id => id === _id)
    );
    const { data } = await mutation({
      variables: { _id, parentId: parent[0]._id }
    });
    data.unassignComponent.map(component => updateComponent(component));
    this.setState({ visible: false });
    closeModal();
  };

  render() {
    const { history, currentProject, closeModal } = this.props;
    const { pathname } = history.location;
    const { components } = currentProject;

    const component = helper.getComponentFromURL(pathname, components)[0];
    const { name = "" } = component;
    if (component.children.length > 0)
      return (
        <Prompt>
          Removing components with children breaks a react tree. Please remove
          all children components to unassign {name.toUpperCase()}.
        </Prompt>
      );

    return (
      <Mutation mutation={UNASSIGN_COMPONENT}>
        {UnassignComponent => (
          <Fragment>
            <Prompt>
              Are you sure you want to remove {name.toUpperCase()} from the
              react tree?
            </Prompt>
            <Buttons>
              <SubmitButton
                onClick={this.updateComponent(UnassignComponent, component)}
              >
                YES
              </SubmitButton>
              <SubmitButton onClick={closeModal}>No</SubmitButton>
            </Buttons>
          </Fragment>
        )}
      </Mutation>
    );
  }
}
