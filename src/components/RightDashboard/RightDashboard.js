import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CreateProject from './CreateProject';

class RightDashboard extends Component {
  render() {
    return (
      <div>
        RightDashboard
          <div>
            <Route path="/main/new-project" component={CreateProject} />
          </div>
      </div>
    );
  }
}

export default RightDashboard;