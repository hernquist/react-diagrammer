import React, { Component } from "react";
import HeaderContainer from "../Header/HeaderContainer";
import LeftDashboard from "../LeftDashboard/LeftDashboard";
import RightDashoard from "../RightDashboard/RightDashboard";
import DiagramMain from "../Diagram/DiagramMain";
import { Query } from "react-apollo";
import { GET_AUTH_USER, PROJECTS_BY_USER_ID } from "../../graphql/queries";
import "../../styles/Layout.css";


class LoggedIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      layout: "logged-in",
      currentProject: null,
      errors: []
    }
  }

  switchLayout = layout => this.setState({ layout });
  
  setCurrentProject = currentProject => this.setState({ currentProject }); 

  render() {
    const { layout, errors, currentProject } = this.state;
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
            errors[0] = `Error! ${error.message}`
            return <div>{errors[0]}</div>
          };
          const user = data.getAuthUser;
          console.log('[Query GET_AUTH_USER]', user);
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
                refetch();
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
                      />
                    </div>
                    <div className="diagram">
                      <DiagramMain 
                        {...this.props}
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
  
export default LoggedIn;
  