import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreateProject from './Projects/CreateProject';
import DeleteProject from './Projects/DeleteProject';
import CurrentComponent from './Components/CurrentComponent';
import UpdateComponentWorkings from './Components/UpdateComponentWorkings';
import UpdateCallbackWorkings from './Components/UpdateCallbackWorkings';
import EditComponentName from './Components/EditComponentName';
import CreateComponent from './Components/CreateComponent';
import DeleteComponent from './Components/DeleteComponent';
import AddExistingComponent from './Components/AddExistingComponent';
import AssignComponent from './Components/AssignComponent';
import UnassignComponent from './Components/UnassignComponent';

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
      createNotification
    } = this.props;

    return (
      <div>
        <Route
          path='/main/new-project'
          render={renderProps => (
            <CreateProject
              {...renderProps}
              user={user}
              refetchProject={refetchProject}
              setCurrentProject={setCurrentProject}
            />
          )}
        />
        <Route
          path='/main/delete-project'
          render={renderProps => (
            <DeleteProject
              {...renderProps}
              user={user}
              currentProject={currentProject}
              projects={projects}
              refetchProject={refetchProject}
            />
          )}
        />
        <Route
          exact
          path='/main/component/:component/:id'
          render={renderProps => (
            <CurrentComponent
              {...renderProps}
              user={user}
              setCurrentProject={setCurrentProject}
              currentProject={currentProject}
              refetchProject={refetchProject}
              updateComponent={updateComponent}
              createNotification={createNotification}
            />
          )}
        />
        <Route
          path='/main/component/:component/:id/update-state'
          render={renderProps => (
            <UpdateComponentWorkings
              {...renderProps}
              updateComponent={updateComponent}
              currentProject={currentProject}
              type='state'
            />
          )}
        />
        <Route
          path='/main/component/:component/:id/update-props'
          render={renderProps => (
            <UpdateComponentWorkings
              {...renderProps}
              updateComponent={updateComponent}
              currentProject={currentProject}
              type='prop'
            />
          )}
        />
        <Route
          path='/main/component/:component/:id/update-callbacks'
          render={renderProps => (
            <UpdateCallbackWorkings
              {...renderProps}
              updateComponent={updateComponent}
              currentProject={currentProject}
              createNotification={createNotification}
            />
          )}
        />
        <Route
          path='/main/component/:component/:id/edit-name'
          render={renderProps => (
            <EditComponentName
              {...renderProps}
              updateComponent={updateComponent}
              currentProject={currentProject}
            />
          )}
        />
        <Route
          path='/main/component/new'
          render={renderProps => (
            <CreateComponent
              {...renderProps}
              currentProject={currentProject}
              updateComponent={updateComponent}
              addComponent={addComponent}
              setParent={setParent}
              createNotification={createNotification}
            />
          )}
        />
        <Route
          path='/main/component/delete-component'
          render={renderProps => (
            <DeleteComponent
              {...renderProps}
              currentProject={currentProject}
              updateComponent={updateComponent}
              addComponent={addComponent}
              refetchProject={refetchProject}
              createNotification={createNotification}
            />
          )}
        />
        <Route
          path='/main/component/add-existing'
          render={renderProps => (
            <AddExistingComponent
              {...renderProps}
              currentProject={currentProject}
              updateComponent={updateComponent}
              addComponent={addComponent}
              setParent={setParent}
            />
          )}
        />
        <Route
          path='/main/component/:component/:id/assign-component'
          render={renderProps => (
            <AssignComponent
              {...renderProps}
              currentProject={currentProject}
              updateComponent={updateComponent}
              setParent={setParent}
            />
          )}
        />
        <Route
          path='/main/component/:component/:id/unassign-component'
          render={renderProps => (
            <UnassignComponent
              {...renderProps}
              currentProject={currentProject}
              updateComponent={updateComponent}
              refetchProject={refetchProject}
            />
          )}
        />
      {/* </Container> */}
      </div>
    );
  }
}

export default RightDashboard;
