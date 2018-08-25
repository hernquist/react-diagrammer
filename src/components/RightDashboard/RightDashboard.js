import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreateProject from './Projects/CreateProject';
import DeleteProject from './Projects/DeleteProject';
import CurrentComponent from './Components/CurrentComponent';
import UpdateComponentWorkings from './Components/UpdateComponentWorkings';
import EditComponentName from './Components/EditComponentName';
import CreateComponent from './Components/CreateComponent';

class RightDashboard extends Component {
  render() {
    const { 
      user, 
      refetchProject, 
      currentProject, 
      setCurrentProject, 
      projects = [],
      updateComponent,
      addComponent,
      setParent,
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
        <Route
          path="/main/component/new"
          render={renderProps =>
            <CreateComponent
              {...renderProps}
              currentProject={currentProject}
              updateComponent={updateComponent}
              addComponent={addComponent}
              setParent={setParent}
            />
          }
        />
      </div>
    );
  }
}

export default RightDashboard;