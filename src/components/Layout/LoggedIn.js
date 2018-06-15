import React, { Component } from "react";
import HeaderContainer from "../Header/HeaderContainer";
import LeftDashboard from "../LeftDashboard/LeftDashboard";
import RightDashoard from "../RightDashboard/RightDashboard";
import DiagramMain from "../Diagram/DiagramMain";
import "../../styles/Layout.css";
import MainTest from "../Diagram/MainTest";


class LoggedIn extends Component {
  render() {

    return (
      <div className="main">
        <div className="header">
          <HeaderContainer />
        </div>
        <div className="left-dashboard">
          <LeftDashboard />
        </div>
        <div className="diagram">
          <DiagramMain {...this.props} />
          <MainTest {...this.props}/>
        </div>
        <div className="right-dashboard">
          <RightDashoard />
        </div>
      </div>
    );
  }
}
  
export default LoggedIn;
  