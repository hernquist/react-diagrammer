import React, { Component } from 'react';
import Header from "../Header/Header";
import LoginForm from "../Auth/LoginForm";
import SignupForm from "../Auth/SignupForm";
import LogoutForm from "../Auth/LogoutForm";
import Polling from "../Polling/Polling";
import RightDashoard from "../RightDashboard/RightDashboard";
import "../../styles/Layout.css";

class NotLoggedIn extends Component {
    render() {
        const {url} = this.props.match;
        const renderAuth = url === "/logout" ? 
            <LogoutForm /> 
            : url === "/signup" ? 
            <SignupForm {...this.props} /> : <LoginForm />
            
        return (
            <div className="main">
                <div className="header">
                    <Header />
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

export default NotLoggedIn;