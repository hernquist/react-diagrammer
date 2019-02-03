import React, { Component, Fragment } from 'react';
import auth from '../HOC/auth';
import ShowUnassigned from './ShowUnassigned';
import DisplayComponent from './DisplayComponent';
import helper from '../../helpers/helper';
import LinesMaker from './LinesMaker';
import { 
  DiagramMainContainer as Container,
  Row
 } from 'styles';

class DiagramMain extends Component {
  state = { selected: '' };

  shouldComponentUpdate(nextProps) {
    this.updated = nextProps.layout !== this.props.layout;
    return nextProps !== this.props;
  }

  componentDidUpdate() {
    if (this.updated) {
      this.forceUpdate();
      this.updated = false;
    }
  }

  render() {
    const { currentProject, history, setParent, layout } = this.props;
    if (!currentProject || !currentProject.components) return null;
    
    const { components } = currentProject;
    const unassigned = helper.unassigned(components);
    const branches = helper.childs(components);
    const root = helper.root(components);

    const width = document.getElementsByClassName('diagram')[0].offsetWidth;
    const height = document.getElementsByClassName('diagram')[0].offsetHeight;
    
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

    return (
      <Fragment>
        {unassigned.length > 0 && (
          <ShowUnassigned
            setParent={setParent}
            unassigned={unassigned}
            history={history}
          />
        )}
        <Container>
          {spaceAround.map((row, i) => (
            <Row key={i}>
              {row.map(card => card ?
                <DisplayComponent
                  y={card.top}
                  x={card.left}
                  key={card._id} 
                  component={card} 
                  {...this.props} 
                /> : null
              )}
            </Row>
          ))}
          <LinesMaker lines={lines} width={width} height={height} />
        </Container>
      </Fragment>
    );
  }
}

export default auth(DiagramMain);
