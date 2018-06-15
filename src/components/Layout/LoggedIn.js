import React, { Component } from "react";
import HeaderContainer from "../Header/HeaderContainer";
import LeftDashboard from "../LeftDashboard/LeftDashboard";
import RightDashoard from "../RightDashboard/RightDashboard";
import DiagramMain from "../Diagram/DiagramMain";
import MainTest from "../Diagram/MainTest";
import "../../styles/Layout.css";


class LoggedIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      layout: "logged-in"
    }
  }

  switchLayout = layout => this.setState({ layout });
  
  render() {
    const { layout } = this.state;
    const fullScreen = {
      display: layout === "full-screen" && "none"
    }
    return (
      <div className={layout}>
        <div className="header">
          <HeaderContainer />
        </div>
        <div className="left-dashboard">
          <LeftDashboard 
            switchLayout={this.switchLayout} 
            layout={layout}
            {...this.props}
          />
        </div>
        <div className="diagram">
          <DiagramMain {...this.props} />
          <MainTest {...this.props}/>
        </div>
        <div className="right-dashboard" style={fullScreen}>
          <RightDashoard />
        </div>
      </div>
    );
  }
}
  
export default LoggedIn;
  