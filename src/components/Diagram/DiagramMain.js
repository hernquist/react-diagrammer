import React, { Component, Fragment } from "react";
import auth from "../HOC/auth";
import ShowUnassigned from "./ShowUnassigned";
import DisplayComponent from "./DisplayComponent";
import helper from "../../helpers/helper";

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

    const width = document.getElementsByClassName("diagram")[0].offsetWidth;
    const height = document.getElementsByClassName("diagram")[0].offsetHeight;
    
    const spaceAround = tree.map((row, j) => {
      const spaces = (width - row.length * 110) / (row.length + 1);
      return row.map((component, i) => 
        Object.assign(
          {}, 
          component, 
          { left: (i+1) * spaces + i * 110 },
          { top : j * 130 + 80 }
        )
      )
    });

    const lines = spaceAround.map((row, i, array) => 
      row.reduce((acc, component) => {
        const connections = component.children.map(id => {
          const child = array[i+1].filter(comp => comp._id === id)[0]
          return ({
            x1: component.left,
            y1: component.top,
            x2: child.left,
            y2: child.top
          })
        })
        return ([...acc, ...connections])
      }, [])
    ).filter(row => row.length > 0)

    console.log('spaceAround:', spaceAround);
    console.log('lines:', lines)

    return (
      <Fragment>
        {unassigned.length > 0 && (
          <ShowUnassigned
            setParent={setParent}
            unassigned={unassigned}
            history={history}
          />
        )}
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          {spaceAround.map((row, i) => (
            <div 
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {row.map(card => {
                if (!card) return null;
                return (
                  <DisplayComponent
                    y={card.top}
                    x={card.left}
                    key={card._id} 
                    component={card} 
                    {...this.props} 
                  />
                )
              })}
            </div>
          ))}
            <svg height={height} width={width}>
          {lines.map((row, i) => (
              row.map(card => (
                <line 
                  x1={card.x1 + 60} 
                  y1={card.y1 + 25} 
                  x2={card.x2 + 60} 
                  y2={card.y2 - 75} 
                  style={{
                    stroke: "#2c3e50",
                    strokeWidth: "2" 
                  }}
                />
              ))
              ))}
              </svg>
        </div>
      </Fragment>
    );
  }
}

export default auth(DiagramMain);
