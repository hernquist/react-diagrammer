import React, { Component } from 'react';
import '../../styles/Login.css'

class NotLoggedIn extends Component {
    render() {
        return (
            <div className="main">
                <div className="header">
                    <Header />
                </div>
                <div className="left-dashboard">
                    <LoginForm />
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

export default NotLoggedIn;