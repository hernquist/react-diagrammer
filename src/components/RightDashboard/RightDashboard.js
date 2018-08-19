import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreateProject from './Features/CreateProject';
import DeleteProject from './Features/DeleteProject';
import CurrentComponent from './Features/CurrentComponent';
import EditComponentName from './Features/EditComponentName';

class RightDashboard extends Component {
  render() {
    const { 
      user, 
      refetchProject, 
      currentProject, 
      setCurrentProject, 
      projects = [],
      component = "default",
      updateComponent,
    } = this.props;

    return (
      <div>
        <Route 
          path="/main/new-project" 
          render={ renderProps => 
            <CreateProject 
              {...renderProps} 
              user={user}
              refetchProject={refetchProject}
              setCurrentProject={setCurrentProject}
            /> 
          }
        />
        <Route
          path="/main/delete-project"
          render={renderProps => 
            <DeleteProject
              {...renderProps}
              user={user}
              currentProject={currentProject}
              setCurrentProject={setCurrentProject}
              projects={projects}
            />
          }
        />
        <Route
          exact 
          path="/main/component/:component/:id"
          render={renderProps => 
            <CurrentComponent
              {...renderProps}
              user={user}
              setCurrentProject={setCurrentProject}
              currentProject={currentProject}
              refetchProject={refetchProject}
              updateComponent={updateComponent}
            />
          }
        />
        <Route 
          path="/main/component/:component/:id/edit-name"
          render={renderProps => 
            <EditComponentName
              {...renderProps}
              updateComponent={updateComponent}
              currentProject={currentProject}
            />
          }
        />
      </div>
    );
  }
}

export default RightDashboard;