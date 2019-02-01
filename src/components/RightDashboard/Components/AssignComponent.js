import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { ASSIGN_COMPONENT } from "../../../graphql/mutations";
import ComponentList from "./StateAndProps/ComponentList";
import { Buttons } from "styles";
import { SubmitButton } from "components/UI/SubmitButton";
import helper from "helpers/helper";

export default class AssignComponent extends Component {
  state = { highlighted: "" };

  updateComponents = (mutation, parentId) => async () => {
    const { updateComponent, currentProject, history, setParent } = this.props;
    const { components } = currentProject;
    const { pathname } = history.location;
    const component = helper.getComponentFromURL(pathname, components);
    const { _id } = component;

    const { data } = await mutation({
      variables: { _id, parentId }
    });

    data.assignComponent.map(component => updateComponent(component));
    setParent("");
    history.push("/main/component");
  };

  close = () => {
    const { history } = this.props;
    const { pathname } = history.location;
    history.push(helper.trimURL(pathname, 5));
  };

  handleParent = id => {
    this.setState({ highlighted: id });
    this.props.setParent(id);
  };

  render() {
    const { currentProject } = this.props;
    const { highlighted } = this.state;
    const components = currentProject.components || [];
    const root = helper.root(components);
    const childs = helper.childs(components);

    return (
      <Mutation mutation={ASSIGN_COMPONENT}>
        {AssignComponent => (
          <Fragment>
            <ComponentList
              potentialParents={[...root, ...childs]}
              chooseComponent={this.handleParent}
              highlighted={highlighted}
              display={true}
              text="Choose a parent?"
            />
            <Buttons>
              <SubmitButton
                onClick={this.updateComponents(AssignComponent, highlighted)}
              >
                ASSIGN
              </SubmitButton>
              <SubmitButton onClick={this.close}>CANCEL</SubmitButton>
            </Buttons>
          </Fragment>
        )}
      </Mutation>
    );
  }
}
