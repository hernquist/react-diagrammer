import React, { Component } from 'react';
import { withApollo } from "react-apollo";

class LogoutForm extends Component {
  logout = async () => {
    await this.props.client.cache.reset();
    localStorage.removeItem("token");
    this.props.history.push("/login");
  }

  render() {
    const { history } = this.props; 
    return (
      <div>
        <h2>Logout</h2>
        <p> Are you sure you want to logout? </p>
        <div>
          <button onClick={this.logout}>YES</button>
          <button onClick={() => history.goBack()}>NO</button>
        </div>
      </div>
    )
  }
}

export default withApollo(LogoutForm);