import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { CREATE_COMPONENT, ADD_CHILD } from "../../../graphql/mutations";
import ComponentList from "./StateAndProps/ComponentList";
import { Buttons } from "styles";
import { SubmitButton } from "components/UI/SubmitButton";
import helper from "../../../helpers/helper";

export default class AssignComponent extends Component {
  state = {
    highlighted: ""
  };

  handleParent = id => {
    this.setState({ highlighted: id });
    this.props.setParent(id);
  };

  addChild = async (childId, mutation) => {
    const components = this.props.currentProject.components || [];
    const parentComponent = helper.find(components, this.state.highlighted);
    const success = await mutation({
      variables: { _id: parentComponent._id, childId }
    });
    if (success.data.addChild) {
      const children = [...parentComponent.children, childId];
      const updatedParent = Object.assign({}, parentComponent, { children });
      console.log("updatedParent:", updatedParent);
      this.props.updateComponent(updatedParent);
    } else {
      console.log("failure");
    }
  };

  render() {
    const { history, currentProject } = this.props;
    const { highlighted } = this.state;
    const components = currentProject.components || [];
    const root = helper.root(components);
    const childs = helper.childs(components);

    return (
      <div>
        {/* // <Mutation mutation={ADD_CHILD}> */}
        <ComponentList
          potentialParents={[...root, ...childs]}
          chooseComponent={this.handleParent}
          highlighted={highlighted}
          display={true}
          text="Choose a parent?"
        />
        <Buttons>
          <SubmitButton>ASSIGN</SubmitButton>
          <SubmitButton>CANCEL</SubmitButton>
        </Buttons>
        {/* // </Mutation> */}
      </div>
    );
  }
}
