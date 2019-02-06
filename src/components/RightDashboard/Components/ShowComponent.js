import React, { Component, Fragment } from "react";
import helper from "helpers/helper";
import {
  FormTitle as Title,
  ShowComponentText as Text,
  ShowComponentContainer as Container,
  ShowComponentBar as Bar,
  ShowComponentTab as Tab,
  ShowComponentContent as Content
} from "styles";
import { ShowState, ShowProps, ShowCallbacks } from "./ShowComponentContent";

export default class ShowComponent extends Component {
  constructor(props) {
    super(props);

    const activeTabMap = {
      prop: "props",
      state: "state",
      callback: "callbacks"
    };
    const activeTab = activeTabMap[props.type] || "state";
    this.state = { activeTab };
  }

  setTab = tab => this.setState({ activeTab: tab });

  render() {
    const { activeTab } = this.state;
    const {
      currentProject,
      history,
      updatedState = {},
      updatedProps = {},
      updatedCallbacks = {}
    } = this.props;
    const { pathname } = history.location;
    const { components } = currentProject;
    const component = helper.getComponentFromURL(pathname, components);

    if (!components) return <div>No Components</div>;

    const {
      state,
      props,
      callbacks,
      children,
      style,
      placement,
      name
    } = component;
    const componentStyle =
      style === "presentational" ? "Presentional" : "ES6 Class or Container";

    const getChildrenText = `${
      children.length === 0 ? `no` : children.length
    } child component${children.length === 1 ? "" : "s"}`;

    const descriptionMap = {
      root: `${name} is a root component with ${getChildrenText}`,
      child: `${name} is a child component of ${getChildrenText}`,
      unassigned: `${name} is a unassigned component`
    };

    const showState = activeTab === "state",
      showProps = activeTab === "props",
      showCallbacks = activeTab === "callbacks";

    console.log("updatedState", updatedState)
    console.log("state", state)

    const displayState =
      Object.keys(updatedState || {}).length > 0
        ? [
            ...state,
            { name: updatedState.name, statetype: updatedState.statetype }
          ]
        : state;

    const displayProps =
      Object.keys(updatedProps || {}).length > 0
        ? [
            ...props,
            { name: updatedProps.name, proptype: updatedProps.proptype }
          ]
        : props;

    const displayCallbacks =
      (updatedCallbacks && updatedCallbacks.name && updatedCallbacks.name.length || 0) > 0
        ? [
            ...callbacks,
            {
              name: updatedCallbacks.name || null,
              description: updatedCallbacks.description || null,
              functionArgs: updatedCallbacks.functionArgs || [],
              setState: updatedCallbacks.setState || []
            }
          ]
        : callbacks;

    return (
      <Fragment>
        <Title>{name}</Title>
        <Title>{componentStyle} Component</Title>
        <Text>{descriptionMap[placement]}</Text>
        <Container>
          <Bar>
            <Tab active={showState} onClick={() => this.setTab("state")}>
              STATE
            </Tab>
            <Tab active={showProps} onClick={() => this.setTab("props")}>
              PROPS
            </Tab>
            <Tab
              active={showCallbacks}
              onClick={() => this.setTab("callbacks")}
            >
              CALLBACKS
            </Tab>
          </Bar>
          <Content>
            <ShowState
              visible={style !== "presentational"}
              order={showState ? 1 : 3}
              highlighted={showState}
              state={displayState}
            />
            <ShowProps
              order={showProps ? 1 : showCallbacks ? 4 : 2}
              highlighted={showProps}
              props={displayProps}
            />
            <ShowCallbacks
              visible={style !== "presentational"}
              order={showCallbacks ? 1 : 2}
              highlighted={showCallbacks}
              callbacks={displayCallbacks}
            />
          </Content>
        </Container>
      </Fragment>
    );
  }
}
