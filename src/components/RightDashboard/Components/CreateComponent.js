import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { CREATE_COMPONENT, ADD_CHILD } from "../../../graphql/mutations";
import ComponentList from "./StateAndProps/ComponentList";
import {
  Label,
  LabelText,
  Buttons,
  Input,
  Selections,
  RightDashboardTitle as Title,
  CreateComponentContainer as Container
} from "styles";
import { 
  RightDashboardButton as SubmitButton,
  NoBoxShadowButton as Button 
} from "components/Ui/RightDashboardButton";
import helper from "../../../helpers/helper";

export default class CreateComponent extends Component {
  constructor(props) {
    super(props);

    const newProject = !props.currentProject.components;
    this.state = {
      name: newProject ? "index" : "",
      placement: newProject ? "root" : "unassigned",
      style: "container",
      highlighted: ""
    };
  }

  handleParent = id => {
    this.setState({ highlighted: id });
    this.props.setParent(id);
  };

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  handlePlacement = placement => this.setState({ placement });

  addChild = async (childId, mutation) => {
    const components = this.props.currentProject.components || [];
    const parentComponent = helper.find(components, this.state.highlighted);
    const success = await mutation({
      variables: { _id: parentComponent._id, childId }
    });
    if (success.data.addChild) {
      const children = [...parentComponent.children, childId];
      const updatedParent = Object.assign({}, parentComponent, { children });
      this.props.updateComponent(updatedParent);
    } else {
      console.log("failure");
    }
  };

  saveComponent = async (mutation, addChild) => {
    const projectId = this.props.currentProject._id;
    const { name, placement, style } = this.state;
    const component = { projectId, name, placement, style };
    
    const { data } = await mutation({ variables: component });
    
    this.props.addComponent(data.createComponent);

    if (data.createComponent.placement === "child")
      this.addChild(data.createComponent._id, addChild);
    this.props.setParent("");
    this.props.history.push(`/main/component/${name}/0`);
  };

  validation = (CreateComponent, AddChild) => {
    const { name, placement, highlighted } = this.state;
    const message =
      name.length < 3
        ? "minimumLength"
        : placement === "child" && !highlighted
          ? "parentNotSelected"
          : null;
    const details = message === "minimumLength" ? "component name" : "";
    message
      ? this.props.createNotification("warning", message, message, details)()
      : this.saveComponent(CreateComponent, AddChild);
  };

  render() {
    const { style, placement, name, highlighted } = this.state;
    const { history, currentProject } = this.props;
    const components = currentProject.components || [];
    const root = helper.root(components);
    const childs = helper.childs(components);
    const doesRootExist = root.length === 1;

    return (
      <Mutation mutation={ADD_CHILD}>
        {AddChild => (
          <Mutation mutation={CREATE_COMPONENT}>
            {CreateComponent => (
              <Container>
                <Title>Create Component</Title>
                <Label>
                  <LabelText>Component Name</LabelText>
                  <Input
                    onChange={e => this.handleChange(e, "name")}
                    value={name}
                    type="text"
                  />
                </Label>
                <Label>
                  <LabelText>Component Type</LabelText>
                  <Selections>
                    <Button
                      onClick={() => this.setState({ style: "container" })}
                      style={{
                        backgroundColor:
                        style === "container" && "rgba(33, 194, 248, 0.7)"
                      }}
                      text="CONTAINER"
                    />
                    <Button
                      onClick={() => this.setState({ style: "presentational" })}
                      style={{
                        backgroundColor:
                        style === "presentational" && "rgba(33, 194, 248, 0.7)"
                      }}
                      text="PRESENTATIONAL"
                    />
                  </Selections>
                </Label>
                <Label>
                  <LabelText>Placement</LabelText>
                  <Selections>
                    <Button
                      onClick={() => this.handlePlacement("unassigned")}
                      style={{
                        backgroundColor:
                        placement === "unassigned" && "rgba(33, 194, 248, 0.7)"
                      }}
                      text="UNASSIGNED"
                        />
                    {doesRootExist && (
                      <Button
                        onClick={() => this.handlePlacement("child")}
                        style={{
                          backgroundColor:
                          placement === "child" && "rgba(33, 194, 248, 0.7)"
                        }}                      
                        text="CHILD"
                      />
                    )}
                  </Selections>
                  <ComponentList
                    potentialParents={[...root, ...childs]}
                    chooseComponent={this.handleParent}
                    highlighted={highlighted}
                    display={placement === "child"}
                    text="Choose a parent?"
                  />
                  {!doesRootExist && (
                    <Button
                      onClick={() => this.handlePlacement("root")}
                      style={{
                        backgroundColor:
                          placement === "root" && "rgba(33, 194, 248, 0.7)"
                      }}
                      text="ROOT"
                    />
                  )}
                </Label>
                <Buttons>
                  <SubmitButton
                    onClick={() => this.validation(CreateComponent, AddChild)}
                    text="DONE"
                  />
                  <SubmitButton
                    onClick={() => history.push("/main")}
                    text="CANCEL"
                  />
                </Buttons>
              </Container>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}
