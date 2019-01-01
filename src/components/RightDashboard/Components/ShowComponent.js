import React, { Component, Fragment } from 'react';
import helper from 'helpers/helper';
import { FormTitle as Title } from 'styles'; 

export default class ShowComponent extends Component {
  render() {
    const { currentProject, history, closeModal } = this.props;
    const { pathname } = history.location;
    const { components } = currentProject;
    const component = helper.getComponentFromURL(pathname, components);
    
    if (!components) return <div>No Components</div>;
    console.log(component);
    const { state, props, callbacks, children, style } = component;
    const componentStyle = style === 'presentational' ? 'Presentional' : 'ES6 Class or Container';

    return (
      <Fragment>
        <Title>{componentStyle}</Title>
        <div>{component.name}</div>
        <div>STATE</div>
          {state.map(obj => <div>{obj.name}: {obj.statetype}</div>)}
        <div>PROPS</div>
          {props.map(obj => <div>{obj.name}: {obj.proptype}</div>)}
        <div>CALLBACKS</div>
          {callbacks.map(obj => <div>{obj.name}: {obj.statetype}</div>)}

        <div>{children.length} CHILDREN</div>
      </Fragment>
    )
  }
}
