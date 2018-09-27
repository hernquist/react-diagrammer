import React, { Component } from 'react';
import auth from '../HOC/auth'
import '../../styles/DiagramMain.css'
import ShowUnassigned from './ShowUnassigned';
import helper from '../../helpers/helper';

const DisplayComponent = ({ component, parent, history }) => {
  const { name, iteration } = component;
  const stateOutput = component.style === 'presentational' ?
    'n/a' : component.state.length;
  const border = component.style === 'container' ?
    '3px solid red' : '3px solid blue';
  const backgroundColor = parent === component._id ? 
    'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)';
  const margin = '0 3px';
  const styles = { border, backgroundColor, margin };
    
  return (
    <div 
      className='component-container' 
      style={styles} 
      onClick={()=>history.push(`/main/component/${name}/${iteration}`)}
    >
      <div className='component-name'>{component.name}</div>
      <div className='component-state'>{`STATE: ${stateOutput}`}</div> 
      <div className='component-props'>{`PROPS: ${component.props.length}`}</div>
    </div>
  )
}

const TreeRow = ({ row, parent, history }) => {
  return (
    <div className='row' style={{ display: "flex", flexDirection: "row", margin: '5px' }}>
      {row.map(component => (
        <DisplayComponent 
          key={component._id} 
          component={component}
          history={history} 
          parent={parent}
        />  
      ))}
    </div> 
  )
}

class DiagramMain extends Component {
  render() {
    const { currentProject, parent, history } = this.props;
    if (!currentProject || !currentProject.components) {return null}
    const { components } = currentProject
    let branches = helper.childs(components);
    let root = helper.root(components);
    console.log('branches', branches)
    let tree = branches.reduce((acc, _, i) => 
      [...acc, acc[i].reduce((a, c) => a.concat(c.children), [])
        .map(branch => helper.find(branches, branch))], [root])
      .filter(branches => branches.length > 0);

    return (
      <div>
        <ShowUnassigned unassigned={helper.unassigned(components)}/>
        <div className="diagram-main-container" style={{display: "flex", flexDirection: "column" }}>
          {tree.map((row, i) => <TreeRow history={history} row={row} key={i} parent={parent}/> )}
        </div>
      </div>
    )
  }
}

export default auth(DiagramMain);