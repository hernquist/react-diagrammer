import React, { Component, Fragment } from "react";
import auth from "../HOC/auth";
import ShowUnassigned from "./ShowUnassigned";
import DisplayComponent from "./DisplayComponent";
import helper from "../../helpers/helper";
import { DiagramMainContainer as Container, Row } from "styles";

const TreeRow = props => (
  <Row>
    {props.row.map(component => (
      <DisplayComponent key={component._id} component={component} {...props} />
    ))}
  </Row>
);

class DiagramMain extends Component {
  state = {
    selected: ""
  };

  render() {
    const { currentProject, parent, history, setParent } = this.props;
    if (!currentProject || !currentProject.components) {
      return null;
    }
    const { components } = currentProject;
    const unassigned = helper.unassigned(components);
    const branches = helper.childs(components);
    const root = helper.root(components);
    
    const tree = branches
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
    console.log('tree:', tree);

    const COLUMNS = 13;    

    const maxRowSize = tree.reduce((acc, curr) => curr.length > acc ? 
      curr.length : acc, 0);
    console.log('maxRowSize:', maxRowSize);
    const maxColumns = maxRowSize * 2 - 1;
    console.log('maxColumns:', maxColumns);

    const rowLength = tree.map(row => row.length);
    console.log('rowLength:', rowLength);
    const columns = rowLength.map(length => length * 2 - 1);
    console.log('colums:', columns);

    const spaceAround = tree.map((row, i) => {
      const spaces = (COLUMNS - rowLength[i]) / (rowLength[i] + 1)
      // const row = [...Array(COLUMNS)].map((_, i) => {
      //   if (i<)
      let counter = 0;
      let spacesCounter = 0;
      const rowAsArray = row.reduce((acc, curr, i) => {
        const accountSpaces = Math.round(spaces + counter) - spacesCounter;
        const x = acc.concat([...Array(accountSpaces)].map(_ => false).concat([curr]));
        spacesCounter = spacesCounter + accountSpaces;
        counter = counter + spaces;
        return x;
      }, []);
      const remainingSpaces = COLUMNS - rowAsArray.length
      return rowAsArray.concat([...Array(remainingSpaces)].map(_ => false));
    })

    console.log('spaceAround:', spaceAround);

    return (
      <Fragment>
        {unassigned.length > 0 && (
          <ShowUnassigned
            setParent={setParent}
            unassigned={unassigned}
            history={history}
          />
        )}
        {/* <Container>
          {tree.map((row, i) => (
            <TreeRow history={history} row={row} key={i} parent={parent} />
          ))}
        </Container> */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'flex-start'
        }}>
          {spaceAround.map((row, i) => (
            <div style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
              {row.map((card, j) => {
                if (!card) return null;
                const x = j * 60;
                const y = i * 130 + 80
                return (
                  <DisplayComponent
                    y={i * 130 + 80}
                    x={x}
                    key={card._id} 
                    component={card} 
                    {...this.props} 
                  />
                )
              })}
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default auth(DiagramMain);
