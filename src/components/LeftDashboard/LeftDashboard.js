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

  updateCSS = () => {
    // const buttons = document.querySelectorAll('.hideable');
    // buttons.forEach(button => button.style.display = 
    //   this.state.selector ? 'none' : 'flex');
    // let dashboard = document.querySelector('.left-dashboard-container');
    // dashboard.style['grid-template-rows'] = 
    //   this.state.selector ? 'auto auto 1fr' : 'auto repeat(6, 1fr)';
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
    const { layout, projects, currentProject, setCurrentProject } = this.props;
    const content = {
      'full-screen': 'SHOW',
      'logged-in': 'HIDE'
    };
    const { selector } = this.state;
    
    return ( 
      <div 
        className='left-dashboard-container'
        onMouseLeave={this.deActivateSelector} 
      >
        <div className='current-project-title'>
          <div>PROJECT {currentProject.name}</div>
        </div>
        <div className='buttons'>
          <div 
            className='dashboard-button selector'
            onClick={selector ? this.deActivateSelector : this.activateSelector}
          >
            <div className='button-content'>{selector ? `DONE` : `SWITCH PROJECT`}</div>
          </div>
            {selector && <ProjectList projects={projects} setCurrentProject={setCurrentProject}/>}
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
            <div className='button-content'>{content[layout]} DASH</div>
          </div>
        </div>
      </div>
    )
  }
}

export default LeftDashboard;