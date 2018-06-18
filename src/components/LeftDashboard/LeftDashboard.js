import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { PROJECTS_BY_USER_ID } from '../../graphql/queries';
import "../../styles/LeftDashboard.css";

class LeftDashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      errors: []
    }
  }

  handleSwitch = () => {
    this.props.layout === "full-screen" ?
      this.props.switchLayout("logged-in") : 
      this.props.switchLayout("full-screen");
  }

  createNewProject = () => this.props.history.push('/main/new-project');

  render() {
    const { layout, user } = this.props;
    const content = {
      "full-screen": "SHOW",
      "logged-in": "HIDE"
    };
    const { errors } = this.state;
    const userId = user._id;
    console.log("[LeftDashboard] render");

    return <Query 
        query={PROJECTS_BY_USER_ID}
        variables={{ userId }} >
      {({ loading, error, data, refetch }) => {
        if (loading) return "Loading...";
        if (error) {
          errors[0] = `Error! ${error.message}`
          data = {};
        };
        refetch();

        return <div className="left-dashboard-container">
          <div className="dashboard-button" 
            onClick={this.createNewProject}>
            <div className="button-content">START</div>

          <div className="dashboard-button">
            <div className="button-content">SWITCH</div>
            <div className="button-content">PROJECT</div>
          </div>

            <div className="button-content">NEW</div>
            <div className="button-content">PROJECT</div>
          </div>
          {data.projectsByUserId.length} 
          <div className="dashboard-button">
            <div className="button-content">CREATE</div>
            <div className="button-content">NEW</div>
            <div className="button-content">COMPONENT</div>
          </div>

          <div className="dashboard-button">
            <div className="button-content">ADD</div>
            <div className="button-content">EXISTING</div>
            <div className="button-content">COMPONENT</div>
          </div>
          <div className="dashboard-button" onClick={this.handleSwitch}>
            <div className="button-content">{content[layout]}</div>
            <div className="button-content">DASHBOARD</div>
          </div>
        </div>
      }}
    </Query>
  }
}

export default LeftDashboard;