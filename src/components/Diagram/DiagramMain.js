import React, { Component } from 'react';
import auth from "../HOC/auth"
import '../../styles/DiagramMain.css'
import ShowUnassigned from './ShowUnassigned';
import helper from '../../Helper/helper';

const DisplayComponent = ({ component, parent }) => {
  const stateOutput = component.style === 'presentational' ?
    'n/a' : component.state.length;
  const border = component.style === 'container' ?
    '3px solid red' : '3px solid blue';
  const backgroundColor = parent === component._id ? 
    'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)';
  const styles = { border, backgroundColor };
  // console.log(styles, parent, component);
    
  return (
    <div className='component-container' style={styles}>
      <div className='component-name'>{component.name}</div>
      <div className='component-state'>{`STATE: ${stateOutput}`}</div> 
      <div className='component-props'>{`PROPS: ${component.props.length}`}</div>
    </div>
  )
}

const TreeRow = ({ row, parent }) => {
  return (
    <div className='row'>
      {row.map(component => (
        <DisplayComponent component={component} key={component._id} parent={parent}/>) 
      )}
    </div> 
  )
}

class DiagramMain extends Component {
  render() {
    const { currentProject, parent } = this.props;
    if (!currentProject || !currentProject.components) {return null}
    const { components } = currentProject
    const tree = [...Array(8)].map(_ => []);
    const childs = helper.childs(components);
    tree[0] = helper.root(components);
     
    console.log('[DiagramMain] tree', tree); 

    return (
      <div>
        <ShowUnassigned unassigned={helper.unassigned(components)}/>
        <div className="diagram-main-container">
          {tree.map((row, i) => <TreeRow row={row} key={i} parent={parent}/> )}
        </div>
      </div>
    )
  }
}

export default auth(DiagramMain);