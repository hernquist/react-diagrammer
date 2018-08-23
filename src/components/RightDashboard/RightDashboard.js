import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreateProject from './Features/CreateProject';
import DeleteProject from './Features/DeleteProject';
import CurrentComponent from './Features/CurrentComponent';
import UpdateComponentWorkings from './Features/UpdateComponentWorkings';
import EditComponentName from './Features/EditComponentName';

class RightDashboard extends Component {
  render() {
    const { 
      user, 
      refetchProject, 
      currentProject, 
      setCurrentProject, 
      projects = [],
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
          path="/main/component/:component/:id/update-state"
          render={renderProps =>
            <UpdateComponentWorkings
              {...renderProps}
              updateComponent={updateComponent}
              currentProject={currentProject}
              type="state"
            />
          }
        />
        <Route
          path="/main/component/:component/:id/update-props"
          render={renderProps =>
            <UpdateComponentWorkings
              {...renderProps}
              updateComponent={updateComponent}
              currentProject={currentProject}
              type="prop"
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