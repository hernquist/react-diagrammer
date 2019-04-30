import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import {
  DELETE_COMPONENT,
  DELETE_UNASSIGNED_COMPONENT
} from "../../../graphql/mutations";
import helper from "helpers/helper";
import {
  CreateProjectContainer as Container,
  FormTitle as Title,
  Buttons,
  Message
} from "styles";
import { ComponentList as List } from "components/Ui/ComponentList";
import { RightDashboardButton as Button } from "../../Ui/RightDashboardButton";
import Errors from "components/Ui/Errors";

class DeleteComponent extends Component {
  state = {
    highlighted: "",
    errors: []
  };

  handleData = async data => {
    const { history, refetchProject } = this.props;
    data.deleteComponent || data.deleteUnassignedComponent
      ? await refetchProject()
      : console.log("Delete project not working!");
    await history.push("/");
  };

  removeComponent = async (mutation, unassigned) => {
    const { _id } = this.state.highlighted;
    const { components } = this.props.currentProject;
    const parent = helper.getParent(components, _id);
    const variables = unassigned ? { _id } : { _id, parentId: parent[0]._id };
    const params = { variables };
    const { data } = await mutation(params);
    this.handleData(data);
  };

  handleMutation = (assigned, unassigned) => () => {
    const { highlighted } = this.state;
    if (!highlighted) {
      console.log("no component selected");
    }
    if (highlighted.placement === "unassigned") {
      this.removeComponent(unassigned, true);
    } else if (highlighted.placement === "child") {
      this.removeComponent(assigned, false);
    }
  };

  updateHighlight = highlighted => () => this.setState({ highlighted });

  navigateToMain = () => this.props.history.push("/main");

  render() {
    const { errors, highlighted } = this.state;
    const { currentProject } = this.props;
    const { components } = currentProject;
    const deletable = component =>
      component.placement === "unassigned" || component.children.length === 0;
    const deletableComponents = components.filter(deletable);
    const visible = highlighted;

    return (
      <Mutation mutation={DELETE_COMPONENT}>
        {DeleteComponent => (
          <Mutation mutation={DELETE_UNASSIGNED_COMPONENT}>
            {DeleteUnassignedComponent => (
              <Fragment>
                <Container>
                  <Title>Delete Component</Title>
                  {components.length > 1 ? (
                    <Fragment>
                      <Message>Select a component to delete</Message>
                      <Errors errors={errors} from="DeleteComponent" />
                      <List
                        components={deletableComponents}
                        setHighlight={this.updateHighlight}
                        highlighted={highlighted}
                      />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Message>
                        You have no components eligible to delete.
                      </Message>
                      <Button onClick={this.navigateToMain} text="DONE" />
                    </Fragment>
                  )}
                </Container>
                <Container visible={visible}>
                  <Message>
                    Do you want to delete the selected component?
                  </Message>
                  <Buttons>
                    <Button
                      onClick={this.handleMutation(
                        DeleteComponent,
                        DeleteUnassignedComponent
                      )}
                      text="Yes"
                    />
                    <Button onClick={this.navigateToMain} text="No" />
                  </Buttons>
                </Container>
              </Fragment>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default DeleteComponent;
