import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import { TOGGLE_COMPONENT_STYLE } from '../../../graphql/mutations';
import '../../../styles/RightDashboard.css';

class CurrentComponent extends Component {
  constructor(props) {
    super(props);
  }

  updateStyle = async ({ _id }, mutation) => {
    const { data } = await mutation({ variables: { _id } });
    this.props.updateComponent(data.toggleComponentStyle);
  } 

  render() {
    const { currentProject, history } = this.props;
    const pieces = history.location.pathname.split("/");
    const name = pieces[3];
    const index = pieces[4];
    
    const { components } = currentProject;
    if (!components) {
      return <div>No Components</div>
    }
    
    const currentComponent = components
    .filter(c => c.name === name)
    .filter(c => c.iteration === Number(index))[0]
    
    return (
      <div className="right-dashboard-container">
        <div className="current-component-title">
          <div>{currentComponent.style.toUpperCase()}</div>
          <div>COMPONENT</div>
          <div>{currentComponent.name}.js</div>
        </div>
        <div 
          className="dashboard-button hideable update-state"
          onClick={() => this.props.history.push(this.props.match.url + '/update-state')}
        >
          <div className="button-content">UPDATE</div>
          <div className="button-content">STATE</div>
        </div>
        <div 
          className="dashboard-button hideable update-props"
          onClick={() => this.props.history.push(this.props.match.url + '/update-props')}
        >
          <div className="button-content">UPDATE</div>
          <div className="button-content">INCOMING</div>
          <div className="button-content">PROPS</div>
        </div>
        <div className="dashboard-button hideable update-callbacks">
          <div className="button-content">UPDATE</div>
          <div className="button-content">CALLBACKS</div>
        </div>

        <Mutation 
          mutation={TOGGLE_COMPONENT_STYLE}
          // update={(cache, { data: { toggleComponentStyle } }) => {
            // const { projects } = cache.readQuery({ query: PROJECTS_BY_USER_ID, data: { userId: this.props.user._id} });
            // const { components} = projects;
            // cache.writeQuery({
              // query: PROJECTS_BY_USER_ID,
              // data: { projects: { components: components.concat([toggleComponentStyle]) } }
            // });
          // }}

          // refetchQueries={ PROJECTS_BY_USER_ID }
        >
          {ToggleComponentStyle => (
            <div 
              className="dashboard-button hideable component-type"
              onClick={ () => this.updateStyle(currentComponent, ToggleComponentStyle) }
            >
              <div className="button-content">TOGGLE</div>
              <div className="button-content">COMPONENT</div>
              <div className="button-content">TYPE</div>
            </div>
          )}
        </Mutation>

        <div 
          className="dashboard-button hideable edit-name"
          onClick={() => this.props.history.push(this.props.match.url + '/edit-name')}
        >
          <div className="button-content">EDIT</div>
          <div className="button-content">NAME</div>
        </div>
      </div>
    )
  }
}

export default CurrentComponent;