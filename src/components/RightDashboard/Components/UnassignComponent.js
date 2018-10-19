import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Modal from "../../UI/Modal";
import { UNASSIGN_COMPONENT } from "graphql/mutations";
import helper from "helpers/helper";

export default class UnassignComponent extends Component {
  updateComponent = (mutation, component) => async () => {
    const { _id } = component;
    console.log(component);

    const { data } = await mutation({ variables: { _id } });
    console.log(data);

    component.placement = data.unassignComponent.placement;
    console.log(component);
  };

  render() {
    const { history, currentProject } = this.props;
    const { pathname } = history.location;
    const { components } = currentProject;

    const component = helper.getComponentFromURL(pathname, components)[0];
    console.log(component);
    const { name = "" } = component;
    return (
      <Mutation mutation={UNASSIGN_COMPONENT}>
        {UnassignComponent => (
          // <Modal>
          <div>
            Are you sure you want to remove {name.toUpperCase()} from the react
            tree?
            <button
              onClick={this.updateComponent(UnassignComponent, component)}
            >
              YES
            </button>
          </div>
          // </Modal>
        )}
      </Mutation>
    );
  }
}
