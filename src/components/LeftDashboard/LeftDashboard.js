import React, { Component } from 'react';
import ProjectList from './Features/ProjectList';
import { Link } from 'react-router-dom';
import '../../styles/LeftDashboard.css';

class LeftDashboard extends Component {
  state = { selector: false };

  componentDidMount() {
    this.props.needsSetting && this.props.setCurrentProject(this.props.currentProject);
  }

  handleSwitch = () => this.props.layout === 'full-screen' ?
      this.props.switchLayout('logged-in') : 
      this.props.switchLayout('full-screen');


  activateSelector = async () => {
    this.setState({ selector: true });
    await this.props.refetch();
  }

  deactivateSelector = () => {
    this.setState({ selector: false});
  }

  render() {
    const { layout, projects, currentProject, setCurrentProject } = this.props;
    const content = {
      'full-screen': 'SHOW',
      'logged-in': 'HIDE'
    };
    const { selector } = this.state;
    const project = currentProject.name.length > 12 ?
      `${currentProject.name}` : `PROJECT ${ currentProject.name }`
    
    return ( 
      <div>
        <div className='left-dashboard-container'>
          <div className='current-project-title'>
            <div>{project}</div>
          </div>
          <div className='buttons'>
            <div 
              className='dashboard-button selector'
              onClick={selector ? this.deactivateSelector : this.activateSelector}
            >
              <div className='button-content'>SWITCH PROJECT</div>
            </div>
            <Link to='/main/new-project' className='dashboard-button hideable'>
              <div className='button-content'>+ PROJECT</div>
            </Link>
            <Link to='/main/delete-project' className='dashboard-button hideable'>
              <div className='button-content'>DELETE PROJECT</div>
            </Link>
            <Link to='/main/component/new' className='dashboard-button hideable'>
              <div className='button-content'>+ COMPONENT</div>
            </Link>
            <Link to='/main/component/add-existing' className='dashboard-button hideable'>
              <div className='button-content'>+ EXISTING COMPONENT</div>
            </Link>
            <div className='dashboard-button hideable' onClick={this.handleSwitch}>
              <div className='button-content'>{content[layout]}</div>
            </div>
          </div>
        </div>
        {selector && <ProjectList 
          deactivateSelector={this.deactivateSelector} 
          projects={projects} 
          setCurrentProject={setCurrentProject}
        />}
      </div>
    )
  }
}

export default LeftDashboard;