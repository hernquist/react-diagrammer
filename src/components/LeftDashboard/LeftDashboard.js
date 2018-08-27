import React, { Component } from 'react';
import ProjectList from './Features/ProjectList';
import { Link } from 'react-router-dom';
import '../../styles/LeftDashboard.css';

class LeftDashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      errors: [],
      selector: false
    }
  }

  componentDidMount() {
    this.props.needsSetting && this.props.setCurrentProject(this.props.currentProject);
  }

  handleSwitch = () => this.props.layout === "full-screen" ?
      this.props.switchLayout("logged-in") : 
      this.props.switchLayout("full-screen");

  updateCSS = () => {
    const buttons = document.querySelectorAll(".hideable");
    buttons.forEach(button => button.style.display = 
      this.state.selector ? "none" : "grid");
    let dashboard = document.querySelector(".left-dashboard-container");
    dashboard.style['grid-template-rows'] = 
      this.state.selector ? "auto auto 1fr" : "auto repeat(6, 1fr)";
  } 

  activateSelector = async() => {
    await this.setState({ selector: true });
    this.updateCSS();
    this.props.refetch();
  }

  deActivateSelector = async () => {
    await this.setState({ selector: false});
    this.updateCSS();
  }

  render() {
    const { layout, user, projects, currentProject, setCurrentProject } = this.props;
    const content = {
      "full-screen": "SHOW",
      "logged-in": "HIDE"
    };
    const { errors, selector } = this.state;
    
    return ( 
      <div 
      className="left-dashboard-container"
      onMouseLeave={this.deActivateSelector} 
      >
        <div className="current-project-title">
          <div>PROJECT</div>
          <div>{currentProject.name}</div>
        </div>
        <div 
          className="dashboard-button selector"
          onClick={selector ? this.deActivateSelector : this.activateSelector}
          >
          <div className="button-content">{selector ? `DONE` : `SWITCH`}</div>
          <div className="button-content">{selector ? null : `PROJECT`}</div>
        </div>
          {selector && <ProjectList projects={projects} setCurrentProject={setCurrentProject}/>}
        <Link to='/main/new-project'>
          <div className="dashboard-button hideable">
            <div className="button-content">NEW</div>
            <div className="button-content">PROJECT</div>
          </div>
        </Link>
        <Link to='/main/delete-project'>
          <div className="dashboard-button hideable">
            <div className="button-content">DELETE</div>
            <div className="button-content">PROJECT</div>
          </div>
        </Link>
        <Link to='/main/component/new'>
          <div className="dashboard-button hideable">
            <div className="button-content">CREATE</div>
            <div className="button-content">NEW</div>
            <div className="button-content">COMPONENT</div>
          </div>
        </Link>
        <Link to='/main/component/add-existing'>
          <div className="dashboard-button hideable">
            <div className="button-content">ADD</div>
            <div className="button-content">EXISTING</div>
            <div className="button-content">COMPONENT</div>
          </div>
        </Link>
        <div className="dashboard-button hideable" onClick={this.handleSwitch}>
          <div className="button-content">{content[layout]}</div>
          <div className="button-content">DASHBOARD</div>
        </div>
      </div>
    )
  }
}

export default LeftDashboard;