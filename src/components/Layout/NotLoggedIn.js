import React, { Component } from 'react';
import HeaderContainer from '../Header/HeaderContainer';
import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';
import LogoutForm from '../Auth/LogoutForm';
import Polling from '../Polling/Polling';
import RightDashoard from '../RightDashboard/RightDashboard';
import notifications from '../HOC/notifications'
import '../../styles/Layout.css';

class NotLoggedIn extends Component {
  render() {
    const { props } = this;
    const { url } = props.match;
    const renderAuth = url === "/logout" ? 
      <LogoutForm {...props}/> 
      : url === "/signup" ? 
      <SignupForm {...props} /> : <LoginForm {...props}/>
        
    return (
      <div className="logged-out">
        <div className="header">
          <HeaderContainer {...props} />
        </div>
        <div className="left-dashboard">
          {renderAuth}
        </div>
        <div className="diagram">
          <Polling />
        </div>
        <div className="right-dashboard">
          <RightDashoard />
        </div>
      </div>
    );
  }
}

export default notifications(NotLoggedIn);