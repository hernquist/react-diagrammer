import React, { Component } from 'react';
import { Query } from 'react-apollo';
import ProjectList from './ProjectList';
import "../../styles/LeftDashboard.css";

class LeftDashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      errors: [],
      selector: false
    }
  }

  handleSwitch = () => {
    this.props.layout === "full-screen" ?
      this.props.switchLayout("logged-in") : 
      this.props.switchLayout("full-screen");
  }

  createNewProject = () => this.props.history.push('/main/new-project');

  activateSelector = () => {
    const buttons = document.querySelectorAll(".hideable");
    buttons.forEach(button => button.style.display = "none");
    let dashboard = document.querySelector(".left-dashboard-container");
    dashboard.style['grid-template-rows'] = "auto auto 1fr";
    this.setState({ selector: true })
  }

  deActivateSelector = () => {

  }

  render() {
    const { layout, user, projects, currentProject, setCurrentProject } = this.props;
    const content = {
      "full-screen": "SHOW",
      "logged-in": "HIDE"
    };
    const { errors, selector } = this.state;

    return ( 
      <div className="left-dashboard-container">
        <div className="current-project-title">
          <div>PROJECT</div>
          <div>{currentProject.name}</div>
        </div>
        <div 
          className="dashboard-button selector"
          onClick={this.activateSelector}
        >
          <div className="button-content">SWITCH</div>
          <div className="button-content">PROJECT</div>
        </div>
        <div 
          className="dashboard-button hideable"  
          onClick={this.createNewProject}
        >
          <div className="button-content">START</div>
          <div className="button-content">NEW</div>
          <div className="button-content">PROJECT</div>
        </div>
        <div className="dashboard-button hideable">
          <div className="button-content">CREATE</div>
          <div className="button-content">NEW</div>
          <div className="button-content">COMPONENT</div>
        </div>
        <div className="dashboard-button hideable">
          <div className="button-content">ADD</div>
          <div className="button-content">EXISTING</div>
          <div className="button-content">COMPONENT</div>
        </div>
        <div className="dashboard-button hideable" onClick={this.handleSwitch}>
          <div className="button-content">{content[layout]}</div>
          <div className="button-content">DASHBOARD</div>
        </div>
        {selector && <ProjectList projects={projects} setCurrentProject={setCurrentProject}/>}
      </div>
    )
  }
}

export default LeftDashboard;