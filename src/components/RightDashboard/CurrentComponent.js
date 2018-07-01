import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import { TOGGLE_COMPONENT_STYLE } from '../../graphql/mutations';
import '../../styles/RightDashboard.css';


class CurrentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: props.currentProject.style,
      executeToggleStyle: false
    }
  }

  onLeavingToggleButton = async ({ _id }, mutation) => {
    if (this.state.executeToggleStyle) {
      const { data } = await mutation({ variables: { _id } });
      console.log("[mutation executed]", data.toggleComponentStyle);
    } 
    this.setState({executeToggleStyle: false});
  } 

  render() {
    const { currentProject, history } = this.props;
    const [name, index] = history.location.pathname.split("/").slice(-2);
    // const [name, index] = pathname;
    console.log(name, Number(index));
    console.log(currentProject);
    console.log(currentProject.components)
    const { components } = currentProject;

    const currentComponent = components
      .filter(c => c.name === name)
      .filter(c => c.iteration === Number(index))[0]
    console.log(currentComponent);  

    return (
      <div className="right-dashboard-container">
        <div className="current-component-title">
          <div>{currentComponent.style.toUpperCase()}</div>
          <div>COMPONENT</div>
          <div>{currentComponent.name}.js</div>
        </div>
        <div className="dashboard-button hideable update-state">
          <div className="button-content">UPDATE</div>
          <div className="button-content">STATE</div>
        </div>
        <div className="dashboard-button hideable update-props">
          <div className="button-content">UPDATE</div>
          <div className="button-content">INCOMING</div>
          <div className="button-content">PROPS</div>
        </div>
        <div className="dashboard-button hideable update-callbacks">
          <div className="button-content">UPDATE</div>
          <div className="button-content">CALLBACKS</div>
        </div>

        <Mutation mutation={TOGGLE_COMPONENT_STYLE}>
          {ToggleComponentStyle => (
            <div 
              className="dashboard-button hideable component-type"
              onClick={ () => this.setState({
                executeToggleStyle: !this.state.executeToggleStyle
                })}
              onMouseLeave={ () => this.onLeavingToggleButton(currentComponent, ToggleComponentStyle) }
            >
              <div className="button-content">TOGGLE</div>
              <div className="button-content">COMPONENT</div>
              <div className="button-content">TYPE</div>
            </div>
          )}
        </Mutation>  
        <div className="dashboard-button hideable edit-name">
          <div className="button-content">EDIT</div>
          <div className="button-content">NAME</div>
        </div>
      </div>
    )
  }
}

export default CurrentComponent;