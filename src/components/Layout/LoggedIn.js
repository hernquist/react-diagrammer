import React, { Component } from 'react';
import HeaderContainer from '../Header/HeaderContainer';
import LeftDashboard from '../LeftDashboard/LeftDashboard';
import RightDashoard from '../RightDashboard/RightDashboard';
import DiagramMain from '../Diagram/DiagramMain';
import { Query } from 'react-apollo';
import { GET_AUTH_USER, PROJECTS_BY_USER_ID } from '../../graphql/queries';
import notifications from '../HOC/notifications'
import '../../styles/Layout.css';

class LoggedIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      layout: 'logged-in',
      currentProject: null,
      errors: [],
      parent: ''
    }
  }

  switchLayout = layout => this.setState({ layout });
  
  setCurrentProject = currentProject => this.setState({ currentProject });
  
  updateComponent = updated => {
    const project = this.state.currentProject;
    const components = this.state.currentProject.components;
    const updatedComponents = components.map(component => component._id === updated._id ? updated : component)
    const currentProject = Object.assign({}, project, { components: updatedComponents});
    this.setState({ currentProject })
  }

  addComponent = updated => {
    const project = this.state.currentProject;
    const components = project.components || [];
    const updatedComponents = [...components, updated];
    const currentProject = Object.assign({}, project, { components: updatedComponents});
    this.setState({ currentProject });
  }
  
  setParent = id => this.setState({ parent: id });

  render() {
    const { layout, errors, currentProject, parent } = this.state;
    const { createNotification } = this.props;
    const fullScreen = {
      display: layout === "full-screen" && "none"
    }

    const findLatest = projects => {
      if (!projects || projects.length < 1) {
        return {name: "no projects"}
      } else {
        return projects.reduce((prev, curr) =>
          curr.dateVisited > prev.dateVisited ? curr : prev);
      }
    }

    return (
      <Query query={GET_AUTH_USER}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) {
            errors[0] = `Error! ${error.message}`;
            console.log(errors);
            return <div>{errors[0]}</div>
          };
          const user = data.getAuthUser;
          const userId = user._id;

          return (
            <Query 
              query={PROJECTS_BY_USER_ID}
              variables={{ userId }} 
            >
              {({ loading, error, data, refetch }) => {
                if (loading) return "Loading...";
                if (error) {
                  errors[0] = `Error! ${error.message}`
                  data = {};
                };
                // Not an optimal pattern, calling refetch here...
                // I also tried passing refetch down to RightDashboard and 
                // then createProject, calling it upon submission of creating
                // a new project, but it caused a hiccup on the screen
                // refetch();
                const projects = data.projectsByUserId;

                return (
                  <div className={layout}>
                    <div className="header">
                      <HeaderContainer />
                    </div>
                    <div className="left-dashboard">
                      <LeftDashboard 
                        {...this.props}
                        switchLayout={this.switchLayout} 
                        setCurrentProject={this.setCurrentProject} 
                        layout={layout}
                        user={user}
                        projects={projects}
                        currentProject={currentProject || findLatest(projects)}
                        needsSetting={!currentProject}
                        refetch={refetch}
                      />
                    </div>
                    <div className="diagram">
                      <DiagramMain 
                        {...this.props}
                        parent={parent}
                        currentProject={currentProject} 
                        />
                    </div>
                    <div className="right-dashboard" style={fullScreen}>
                      <RightDashoard 
                        {...this.props}
                        refetchProject={refetch}
                        user={user}
                        currentProject={currentProject || findLatest(projects)}
                        projects={projects}
                        setCurrentProject={this.setCurrentProject}
                        updateComponent={this.updateComponent}
                        addComponent={this.addComponent}
                        setParent={this.setParent}
                        createNotification={createNotification}
                      />
                    </div>
                  </div>
                )
              }}
            </Query>
          )
        }}
      </Query>
    )
  }
}
  
export default notifications(LoggedIn);
  