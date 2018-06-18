import React, { Component } from "react";
import HeaderContainer from "../Header/HeaderContainer";
import LeftDashboard from "../LeftDashboard/LeftDashboard";
import RightDashoard from "../RightDashboard/RightDashboard";
import DiagramMain from "../Diagram/DiagramMain";
import MainTest from "../Diagram/MainTest";
import { Query } from "react-apollo";
import { GET_AUTH_USER } from "../../graphql/queries";
import "../../styles/Layout.css";


class LoggedIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      layout: "logged-in",
      errors: []
    }
  }

  switchLayout = layout => this.setState({ layout });
  
  render() {
    const { layout, errors } = this.state;
    const fullScreen = {
      display: layout === "full-screen" && "none"
    }
    return <Query query={GET_AUTH_USER}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) {
          errors[0] = `Error! ${error.message}`
          return <div>{errors[0]}</div>
        };
        const user = data.getAuthUser;

        return <div className={layout}>
          <div className="header">
            <HeaderContainer />
          </div>
          <div className="left-dashboard">
            <LeftDashboard 
              switchLayout={this.switchLayout} 
              layout={layout}
              user={user}
              {...this.props}
            />
          </div>
          <div className="diagram">
            <DiagramMain {...this.props} />
            <MainTest {...this.props}/>
          </div>
          <div className="right-dashboard" style={fullScreen}>
            <RightDashoard 
              user={user}
              {...this.props}
            />
          </div>
        </div>
      }}
    </Query>
  }
}
  
export default LoggedIn;
  