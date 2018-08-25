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
  const margin = '0 3px';
  const styles = { border, backgroundColor, margin };
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
    <div className='row' style={{ display: "flex", flexDirection: "row", margin: '5px' }}>
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
    let root = helper.root(components);
    let chs = []
    // tree[0] = helper.root(components);
    // chs[1] = tree[0].reduce((a, c) => {return a.concat(c.children)}, [] );
    // tree[1] = chs[1].map(chs => helper.find(childs, chs));
    // chs[2] = tree[1].reduce((a, c) => { return a.concat(c.children) }, []);
    // tree[2] = chs[2].map(chs => helper.find(childs, chs));

    let t = childs.reduce((acc, _, i) => {
      const children = acc[i].reduce((a, c) => { console.log(a, c);
        return a.concat(c.children) }, []);
      console.log(children);
      const row = children.map(child => helper.find(childs, child));
      return [...acc, row]
    }, [helper.root(components)])
      .filter(row => row.length > 0);
  
    
     
    // console.log('[DiagramMain] tree', tree); 
    console.log('[DiagramMain] t', t); 
    // console.log('[DiagramMain] typeof t', typeof t); 
    // console.log('[DiagramMain] root', root); 
    // console.log('[DiagramMain] typeof root', typeof root); 
    // console.log('[DiagramMain] =', t.length === tree.length); 


    return (
      <div>
        <ShowUnassigned unassigned={helper.unassigned(components)}/>
        <div className="diagram-main-container" style={{display: "flex", flexDirection: "column" }}>
          {t.map((row, i) => <TreeRow row={row} key={i} parent={parent}/> )}
        </div>
      </div>
    )
  }
}

export default auth(DiagramMain);