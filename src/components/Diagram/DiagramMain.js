import React, { Component } from 'react';
import auth from "../HOC/auth"
import '../../styles/DiagramMain.css'

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
    const root = components.filter(component => component.placement === 'root');
    tree[0] = root;
     
    console.log('[DiagramMain] tree', tree); 

    return (
      <div className="diagram-main-container">
        {tree.map((row, i) => <TreeRow row={row} key={i}/> )}
      </div>
    )
  }
}

export default auth(DiagramMain);