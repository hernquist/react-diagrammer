import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import {
  COPY_COMPONENT,
  ADD_CHILD,
  COPY_CHILDREN
} from "../../../graphql/mutations";
import ComponentList from "./StateAndProps/ComponentList";
import helper from "../../../helpers/helper";
import KeepChildren from "./Children/KeepChildren";
import { Buttons, Label, LabelText, Selections } from "styles";
import { RightDashboardButton as Button } from "../../UI/RightDashboardButton";

export default class AddExistingComponent extends Component {
  state = {
    highlighted: "",
    placement: "",
    copiedComponent: {},
    keepChildren: false
  };

  chooseComponent = id => {
    this.setState({ highlighted: id });
    this.props.setParent(id);
  };

  setCopiedComponent = () => {
    const copiedComponent = helper.find(
      this.props.currentProject.components,
      this.state.highlighted
    );
    this.props.setParent("");
    this.setState({ copiedComponent, highlighted: "" });
  };

  handleChange = (e, key) => this.setState({ [key]: e.target.value });

  handleUnassigned = () => this.setState({ placement: "unassigned" });

  handleChild = () => this.setState({ placement: "child" });

  findIteration = id => {
    const components = this.props.currentProject.components;
    return components.filter(component => component.cloneId === id).length;
  };

  addChild = async (childId, mutation) => {
    const components = this.props.currentProject.components || [];
    const parentComponent =
      helper.find(components, this.state.highlighted) || {};
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

  saveComponent = async (mutation, addChild, copyChildren) => {
    const { placement, keepChildren, copiedComponent } = this.state;

    let children = [];
    let result = {};

    if (keepChildren) {
      const childrenData = copiedComponent.children.map(child => ({
        _id: child,
        iteration: this.findIteration(child)
      }));

      result = await copyChildren({ variables: { childrenData } });
      children = result.data.copyChildren.map(child => child._id);
    }

    // TODO: why does copiedComponent sometimes not have a cloneId?
    // is it not being returned from the backend
    // 2/18/19 seems to be working keep checking
<<<<<<< HEAD
=======

>>>>>>> 5856007afdfd6e453a1053b65915e117e177b14d
    let cloneId = copiedComponent.cloneId || copiedComponent._id;
    const iteration = this.findIteration(cloneId);

    const component = Object.assign(
      {},
      copiedComponent,
      { placement },
      { cloneId },
      { iteration },
      { children }
    );
    delete component._id;

    const { data } = await mutation({ variables: component });

    this.props.addComponent(data.copyComponent);
    // TODO: this Object.assign to cover up a glitch in the backend...
    keepChildren &&
      result.data.copyChildren.forEach(component =>
        this.props.addComponent(Object.assign({}, component, { children: [] }))
      );

    if (data.copyComponent.placement === "child")
      this.addChild(data.copyComponent._id, addChild);

    this.props.setParent("");
    const { name } = data.copyComponent;
    this.props.history.push(`/main/component/${name}/0`);
  };

  handleKeepChildren = value => this.setState({ keepChildren: value });

  render() {
    const {
      placement,
      highlighted,
      keepChildren,
      copiedComponent
    } = this.state;
    const { history, currentProject, setParent } = this.props;
    const components = currentProject.components || [];
    const root = helper.root(components);
    const childs = helper.childs(components);
    const doesRootExist = root.length === 1;

    return (
      <Mutation mutation={COPY_CHILDREN}>
        {CopyChildren => (
          <Mutation mutation={ADD_CHILD}>
            {AddChild => (
              <Mutation mutation={COPY_COMPONENT}>
                {CopyComponent => (
                  <div>
                    {Object.keys(copiedComponent).length > 0 ? (
                      <Fragment>
                        <Label>
                          {!placement && (
                            <Selections>
                              <Button
                                onClick={() =>
                                  this.handleUnassigned("unassigned")
                                }
                                style={{
                                  backgroundColor:
                                    placement === "unassigned" &&
                                    "rgba(33, 194, 248, 0.7)"
                                }}
                                text="UNASSIGNED"
                              />
                              {doesRootExist && (
                                <Button
                                  onClick={() => this.handleChild("child")}
                                  style={{
                                    backgroundColor:
                                      placement === "child" &&
                                      "rgba(33, 194, 248, 0.7)"
                                  }}
                                  text="CHILD"
                                />
                              )}
                            </Selections>
                          )}
                          <ComponentList
                            potentialParents={[...root, ...childs]}
                            display={placement === "child" && !highlighted}
                            chooseComponent={this.chooseComponent}
                            highlighted={highlighted}
                            text="Choose a parent:"
                          />
                          {!doesRootExist && (
                            <Button
                              onClick={() => this.handlePlacement("root")}
                              style={{
                                backgroundColor:
                                  placement === "root" &&
                                  "rgba(33, 194, 248, 0.7)"
                              }}
                              text="ROOT"
                            />
                          )}
                        </Label>
                        <KeepChildren
                          hasChildren={copiedComponent.children.length > 0}
                          display={placement === "child" && !!highlighted}
                          keepChildren={keepChildren}
                          setKeepChildren={this.handleKeepChildren}
                        />
                        <Button
                          className="dashboard-button"
                          disabled={!placement}
                          onClick={() =>
                            this.saveComponent(
                              CopyComponent,
                              AddChild,
                              CopyChildren
                            )
                          }
                          text="DONE"
                        />
                        <Button
                          className="dashboard-button"
                          onClick={() => {
                            setParent("");
                            history.push("/main");
                          }}
                          text="CANCEL"
                        />
                      </Fragment>
                    ) : (
                      <Fragment>
                        <ComponentList
                          potentialParents={[...root, ...childs]}
                          chooseComponent={this.chooseComponent}
                          highlighted={highlighted}
                          display={true}
                          text="Which component?"
                        />
                        <Buttons>
                          <Button
                            onClick={this.setCopiedComponent}
                            disabled={!highlighted}
                            text="CONTINUE"
                          />
                          <Button
                            onClick={() => history.push("/main")}
                            text="CANCEL"
                          />
                        </Buttons>
                      </Fragment>
                    )}
                  </div>
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}
