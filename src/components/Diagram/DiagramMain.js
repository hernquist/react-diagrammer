import React, { Component } from 'react';
import auth from "../HOC/auth"
import '../../styles/DiagramMain.css'
import ShowUnassigned from './ShowUnassigned';
import helper from '../../Helper/helper';

const DisplayComponent = ({ component }) => {
  const stateOutput = component.style === 'presentational' ?
    'n/a' : component.state.length;
  
  return (
    <div 
      className='component-container'
      style={component.style === 'container' ? 
        {'border': '3px solid red'} :
        {'border': '3px solid blue'} }
    >
      <div className='component-name'>{component.name}</div>
      <div className='component-state'>{`STATE: ${stateOutput}`}</div> 
      <div className='component-props'>{`PROPS: ${component.props.length}`}</div>
    </div>
  )
}

const TreeRow = ({ row }) => {
  return (
    <div className='row'>
      {row.map(component => <DisplayComponent component={component} key={component._id}/> )}
    </div> 
  )
}

class DiagramMain extends Component {
  render() {
    const { currentProject } = this.props;
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
          {tree.map((row, i) => <TreeRow row={row} key={i}/> )}
        </div>
      </div>
    )
  }
}

export default auth(DiagramMain);