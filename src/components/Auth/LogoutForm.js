import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { RightDashboardButton as SubmitButton } from "components/UserInterface/RightDashboardButton";
import { AuthWrapper, FormTitle as Title, Text, Buttons } from "styles";

const style = { width: "120px" };

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
        <Title>Logout</Title>
        <p style={{ fontSize: "20px", textAlign: "center" }}>
          Are you sure you want to logout?
        </p>
        <Buttons>
          <SubmitButton style={style} onClick={this.logout} text="YES" />
          <SubmitButton
            style={style}
            onClick={() => history.goBack()}
            text="NO"
          />
        </Buttons>
      </AuthWrapper>
    );
  }
}

export default withApollo(LogoutForm);
