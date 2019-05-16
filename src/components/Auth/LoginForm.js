import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import { LOGIN } from "../../graphql/mutations";
import { GET_AUTH_USER } from "../../graphql/queries";
import Errors from "../UserInterface/Errors";
import { RightDashboardButton as SubmitButton } from "components/UserInterface/RightDashboardButton";
import {
  AuthWrapper,
  InputField,
  FormTitle as Title,
  LabelText,
  CreateProjectForm as Form
} from "styles";

// import { AuthWrapper, InputField, FormTitle as Title, LabelText } from "styles";

class LoginForm extends Component {
  initialState = {
    errors: [],
    email: "",
    password: ""
  };

  state = this.initialState;

  onSubmit = async (event, Login) => {
    event.preventDefault();
    const { email, password } = this.state;
    await Login({ variables: { email, password } });
  };

  handleInput = (e, key) => this.setState({ [key]: e.target.value });

  render() {
    const { email, password, errors } = this.state;
    const { createNotification } = this.props;

    return (
      <Query query={GET_AUTH_USER} fetchPolicy="cache">
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) {
            errors[0] = `Error! ${error.message}`;
            data = {};
          }
          if (data.getAuthUser) {
            this.props.history.push("/main");
          }
          return (
            <AuthWrapper>
              <Title>Login</Title>
              <Mutation
                mutation={LOGIN}
                onCompleted={result => {
                  result.login && localStorage.setItem("token", result.login);
                  this.props.history.push("/main");
                }}
                onError={error => {
                  createNotification("warning", error.message.split(": ")[1])();
                  this.setState(this.initialState);
                }}
              >
                {Login => (
                  <Form onSubmit={e => this.onSubmit(e, Login)}>
                    <InputField>
                      <LabelText>Email</LabelText>
                      <input
                        value={email}
                        onChange={e => this.handleInput(e, "email")}
                      />
                    </InputField>
                    <InputField>
                      <LabelText>Password</LabelText>
                      <input
                        value={password}
                        onChange={e => this.handleInput(e, "password")}
                      />
                    </InputField>
                    <Errors
                      errors={errors}
                      exception={"auth"}
                      from={"LoginForm"}
                    />
                    <SubmitButton text="Submit" />
                  </Form>
                )}
              </Mutation>
            </AuthWrapper>
          );
        }}
      </Query>
    );
  }
}

export default LoginForm;
