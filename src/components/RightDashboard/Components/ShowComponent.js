import React, { Component, Fragment } from 'react';
import helper from 'helpers/helper';
import { 
  FormTitle as Title, 
  ShowComponentText as Text,
  ShowComponentTable as Table, 
  ShowComponentBar as Bar, 
  ShowComponentTab as Tab, 
} from 'styles';

export default class ShowComponent extends Component {
  render() {
    const { currentProject, history, closeModal } = this.props;
    const { pathname } = history.location;
    const { components } = currentProject;
    const component = helper.getComponentFromURL(pathname, components);
    
    if (!components) return <div>No Components</div>;
    console.log(component);

    const { state, props, callbacks, children, style, placement, name } = component;
    const componentStyle = style === 'presentational' ? 'Presentional' : 'ES6 Class or Container';

    const getChildrenText = `${children.length === 0 ?
      `no` : children.length} child component${children.length === 1 ? '' : 's'}`;

    const descriptionMap = {
      'root': `${name} is a root component with ${getChildrenText}`,
      'child': `${name} is a child component of ${getChildrenText}`,
      'unassigned': `${name} is a unassigned component` 
    }

    return (
      <Fragment>
        <Title>{name}</Title>
        <Title>{componentStyle} Component</Title>
        <Text>{descriptionMap[placement]}</Text>
        <Table>
          <Bar >
            <Tab>STATE</Tab>
            <Tab>PROPS</Tab>
            <Tab>CALLBACKS</Tab>
          </Bar>

          <div>STATE</div>
            {state.map(obj => <div key={obj.name + obj.statetype}>{obj.name}: {obj.statetype}</div>)}
          <div>PROPS</div>
            {props.map(obj => <div key={obj.name +obj.proptype}>{obj.name}: {obj.proptype}</div>)}
          <div>CALLBACKS</div>
            {callbacks.map(obj => <div key={obj.name + obj.statetype}>{obj.name}: {obj.statetype}</div>)}
        
        </Table>
      </Fragment>
    )
  }
}
