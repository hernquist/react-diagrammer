import React, { Component } from "react";
import Header from "../Header/Header";
import LoginForm from "../Auth/LoginForm";
import Polling from "../Polling/Polling";
import "../../styles/LoggedIn.css";

class LoggedIn extends Component {
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

export default LoggedIn;
