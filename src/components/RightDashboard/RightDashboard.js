import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreateProject from './CreateProject';
import DeleteProject from './DeleteProject';
import CurrentComponent from './CurrentComponent';

class RightDashboard extends Component {
  render() {
    const { 
      user, 
      refetchProject, 
      currentProject, 
      setCurrentProject, 
      projects = [],
      component = "default"
    } = this.props;

    return (
      <div>
        <Route 
          path="/main/new-project" 
          render={ renderProps => <CreateProject 
            {...renderProps} 
            user={user}
            refetchProject={refetchProject}
            setCurrentProject={setCurrentProject}
          /> }
        />
        <Route
          path="/main/delete-project"
          render={renderProps => <DeleteProject
            {...renderProps}
            user={user}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            projects={projects}
          />}
        />
        <Route
          path="/main/component/:component/:id"
          render={renderProps => <CurrentComponent
            {...renderProps}
            user={user}
            currentProject={currentProject}
            refetchProject={refetchProject}
          />}
        />
      </div>
    );
  }
}

export default RightDashboard;