import React, { Component } from "react";
import Header from "../Header/Header";
import LeftDashboard from "../LeftDashboard/LeftDashboard";
import Polling from "../Polling/Polling";
import RightDashoard from "../RightDashboard/RightDashboard";
import "../../styles/Layout.css";
import DiagramMain from "../Diagram/DiagramMain";


class LoggedIn extends Component {
  render() {

    return (
      <div className="main">
        <div className="header">
          <Header />
        </div>
        <div className="left-dashboard">
          <LeftDashboard />
        </div>
        <div className="diagram">
          <DiagramMain />
        </div>
        <div className="right-dashboard">
          <RightDashoard />
        </div>
      </div>
    );
  }
}

export default LoggedIn;
