import React, { Component } from "react";
import HeaderContainer from "../Header/HeaderContainer";
import TopDashboard from "../TopDashboard/TopDashboard";
import RightDashboard from "../RightDashboard/RightDashboard";
import DiagramMain from "../Diagram/DiagramMain";
import { Query } from "react-apollo";
import { GET_AUTH_USER, PROJECTS_BY_USER_ID } from "../../graphql/queries";
import notifications from "../HOC/notifications";
import { Layout } from "styles";

class LoggedIn extends Component {
  state = {
    layout: "logged-in",
    currentProject: null,
    errors: [],
    parent: ""
  };

  switchLayout = layout => this.setState({ layout });

  setCurrentProject = currentProject => () => this.setState({ currentProject });

  updateComponent = updated => {
    const project = this.state.currentProject;
    const components = this.state.currentProject.components;
    const updatedComponents = components.map(
      component => (component._id === updated._id ? updated : component)
    );

    const currentProject = Object.assign({}, project, {
      components: updatedComponents
    });
    this.setState({ currentProject });
  };

  addComponent = updated => {
    const project = this.state.currentProject;
    const components = project.components || [];
    const updatedComponents = [...components, updated];
    const currentProject = Object.assign({}, project, {
      components: updatedComponents
    });

    this.setState({ currentProject });
  };

  setParent = id => this.setState({ parent: id });

  render() {
    const { layout, errors, currentProject, parent } = this.state;
    const { createNotification } = this.props;
    const fullScreen = { display: layout === "full-screen" && "none" };

    const findLatest = projects => 
      (!projects || projects.length < 1) ?
        ({ name: "no projects" }) 
        : projects.reduce(
            (prev, curr) => (curr.dateVisited > prev.dateVisited ? curr : prev)
          );

    return (
      <Query query={GET_AUTH_USER}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) {
            errors[0] = `Error! ${error.message}`;
            console.log(errors);
            return <div>{errors[0]}</div>;
          }
          const user = data.getAuthUser;
          const userId = user._id;

          return (
            <Query query={PROJECTS_BY_USER_ID} variables={{ userId }}>
              {({ loading, error, data, refetch }) => {
                if (loading) return "Loading...";
                if (error) {
                  errors[0] = `Error! ${error.message}`;
                  data = {};
                }
                const projects = data.projectsByUserId;
                const latestProject = currentProject || findLatest(projects);

                return (
                  <Layout className={layout}>
                    <div className={layout}>
                      <div className="header">
                        <HeaderContainer className="header" />
                      </div>
                      <div className="left-dashboard">
                        <TopDashboard
                          {...this.props}
                          switchLayout={this.switchLayout}
                          setCurrentProject={this.setCurrentProject}
                          layout={layout}
                          user={user}
                          projects={projects}
                          currentProject={
                            currentProject || findLatest(projects)
                          }
                          needsSetting={!currentProject}
                          refetch={refetch}
                        />
                      </div>
                      <div className="diagram">
                        <DiagramMain
                          {...this.props}
                          parent={parent}
                          currentProject={currentProject}
                          setParent={this.setParent}
                          layout={layout}
                        />
                      </div>
                      <div className="right-dashboard" style={fullScreen}>
                        <RightDashboard
                          {...this.props}
                          refetchProject={refetch}
                          user={user}
                          currentProject={latestProject}
                          projects={projects}
                          setCurrentProject={this.setCurrentProject}
                          updateComponent={this.updateComponent}
                          addComponent={this.addComponent}
                          setParent={this.setParent}
                          createNotification={createNotification}
                        />
                      </div>
                    </div>
                  </Layout>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default notifications(LoggedIn);
