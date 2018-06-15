import React, { Component } from 'react';
import "../../styles/LeftDashboard.css";

class LeftDashboard extends Component {
    handleSwitch = () => {
        this.props.layout === "full-screen" ?
            this.props.switchLayout("logged-in") : 
            this.props.switchLayout("full-screen");
    }

    render() {
        const { layout } = this.props;
        const content = {
            "full-screen": "SHOW",
            "logged-in": "HIDE"
        }
        return <div className="left-dashboard-container">
            <div className="dashboard-button" onClick={this.handleSwitch}>
                <div className="button-content">
                    {content[layout]}
                </div>
                <div className="button-content">
                    DASHBOARD
                </div>
            </div>
          </div>;
    }
}

export default LeftDashboard;