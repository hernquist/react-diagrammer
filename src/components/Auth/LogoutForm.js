import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { AuthWrapper } from "styles";
import { SubmitButton } from "../Ui/SubmitButton";

class LogoutForm extends Component {
  logout = async () => {
    await this.props.client.cache.reset();
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  render() {
    const { history } = this.props;
    return (
      <AuthWrapper>
        <h2>Logout</h2>
        <h4> Are you sure you want to logout? </h4>
        <SubmitButton onClick={this.logout}>YES</SubmitButton>
        <SubmitButton onClick={() => history.goBack()}>NO</SubmitButton>
      </AuthWrapper>
    );
  }
}

export default withApollo(LogoutForm);
