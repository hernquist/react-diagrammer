import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import { LOGIN } from "../../graphql/mutations";
import { GET_AUTH_USER } from "../../graphql/queries";
import { SubmitButton } from "../UI/SubmitButton";
import { AuthWrapper, InputField, ErrorsContainer as Errors } from "styles";

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
              <h2>Login</h2>
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
                  <form onSubmit={e => this.onSubmit(e, Login)}>
                    <InputField>
                      <label>Email</label>
                      <input
                        value={email}
                        onChange={e =>
                          this.setState({
                            email: e.target.value
                          })
                        }
                      />
                    </InputField>
                    <InputField>
                      <label>Password</label>
                      <input
                        value={password}
                        onChange={e =>
                          this.setState({
                            password: e.target.value
                          })
                        }
                      />
                    </InputField>
                    <Errors>
                      {errors
                        .filter(
                          error =>
                            error !==
                            "Error! GraphQL error: user not authenticated"
                        )
                        .map(error => (
                          <div key={error}>{error}</div>
                        ))}
                    </Errors>
                    <SubmitButton>Submit</SubmitButton>
                  </form>
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
