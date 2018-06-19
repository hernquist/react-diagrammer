import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreateProject from './CreateProject';

class RightDashboard extends Component {
  render() {
    const { user, refetchProjects } = this.props;
    console.log(user);

    return (
      <div>
        <Route 
          path="/main/new-project" 
          render={ renderProps => <CreateProject 
            {...renderProps} 
            user={user}
            refetchProjects={refetchProjects}
          /> }
        />
      </div>
    );
  }
}

export default RightDashboard;