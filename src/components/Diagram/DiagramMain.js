import React, { Component } from 'react';
import { Query } from "react-apollo";
import auth from "../HOC/auth"
import { GET_AUTH_USER } from '../../graphql/queries';
import '../../styles/DiagramMain.css'

const DisplayComponent = ({ component }) => (
  <div 
    className='component-container'
    key={component._id}
    style={component.style === 'container' ? 
      {'border': '1px double green'} :
      {'border': '1px double blue'} }
  >
    <div className='component-name'>{component.name}</div>
    <div className='component-state'>{`STATE: ${component.state.length}`}</div> 
    <div className='component-props'>{`PROPS: ${component.props.length}`}</div> 
  </div>
)

const TreeRow = ({ row }) => {
  return (
    <div className='row'>
      {row.map(component => <DisplayComponent component={component}/> )}
    </div> 
  )
}

class DiagramMain extends Component {
  render() {
    const { currentProject } = this.props;
    const components = currentProject ? currentProject.components : [];
    console.log('[DiagramMain]', components); 
    const tree = [...Array(8)].map(_ => []);
    const root = components.filter(component => component.placement === 'root');
    tree[0] = root;
     
    console.log('[DiagramMain]', tree); 
    console.log('[DiagramMain]', tree[0][0]);

    return (
      <div className="diagram-main-container">
        {tree.map((row, i) => <TreeRow row={row} key={i}/> )}
      </div>
    )
  }
}

export default auth(DiagramMain);