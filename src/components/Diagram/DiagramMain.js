import React, { Component, Fragment } from "react";
import auth from "../HOC/auth";
import ShowUnassigned from "./ShowUnassigned";
import DisplayComponent from "./DisplayComponent";
import helper from "../../helpers/helper";
import { DiagramMainContainer as Container, Row } from "styles";

const TreeRow = props => {
  return (
    <Row>
      {props.row.map(component => (
        <DisplayComponent
          key={component._id}
          component={component}
          {...props}
        />
      ))}
    </Row>
  );
};

class DiagramMain extends Component {
  state = {
    selected: ""
  };

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
