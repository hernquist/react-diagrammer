import React, { Component, Fragment } from "react";
import auth from "../HOC/auth";
import ShowUnassigned from "./ShowUnassigned";
import helper from "../../helpers/helper";
import {
  DiagramMainContainer as Container,
  ComponentContainer,
  ComponentName,
  Row
} from "styles";

const DisplayComponent = ({ component, parent, history }) => {
  const { name, iteration } = component;
  const stateOutput =
    component.style === "presentational" ? "n/a" : component.state.length;
  const border =
    component.style === "container" ? "3px solid red" : "3px solid blue";
  const backgroundColor =
    parent === component._id ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.1)";
  const margin = "0 3px";
  const styles = { border, backgroundColor, margin };

  return (
    <ComponentContainer
      style={styles}
      onClick={() => history.push(`/main/component/${name}/${iteration}`)}
    >
      <ComponentName>{component.name}</ComponentName>
      <div>{`STATE: ${stateOutput}`}</div>
      <div>{`PROPS: ${component.props.length}`}</div>
    </ComponentContainer>
  );
};

const TreeRow = ({ row, parent, history }) => {
  return (
    <Row>
      {row.map(component => (
        <DisplayComponent
          key={component._id}
          component={component}
          history={history}
          parent={parent}
        />
      ))}
    </Row>
  );
};

class DiagramMain extends Component {
  render() {
    const { currentProject, parent, history } = this.props;
    if (!currentProject || !currentProject.components) {
      return null;
    }
    const { components } = currentProject;
    let branches = helper.childs(components);
    let root = helper.root(components);

    let tree = branches
      .reduce(
        (acc, _, i) => [
          ...acc,
          acc[i]
            .reduce((a, c) => a.concat(c.children), [])
            .map(branch => helper.find(branches, branch))
        ],
        [root]
      )
      .filter(branches => branches.length > 0);

    return (
      <Fragment>
        {/* TODO */}
        {/* <ShowUnassigned unassigned={helper.unassigned(components)} /> */}
        <Container>
          {tree.map((row, i) => (
            <TreeRow history={history} row={row} key={i} parent={parent} />
          ))}
        </Container>
      </Fragment>
    );
  }
}

export default auth(DiagramMain);
