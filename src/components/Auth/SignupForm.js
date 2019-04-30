import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNUP } from "../../graphql/mutations";
import { validateEmail } from "../../helpers/validations";
// import { SubmitButton } from '../Ui/SubmitButton';
// import Errors from '../Ui/Errors';
import { AuthWrapper, InputField, FormTitle as Title, LabelText } from "styles";

class SignupForm extends Component {
  initialState = {
    errors: [],
    email: "",
    name: "",
    password: ""
  };

  state = this.initialState;

  validation = (event, mutation) => {
    event.preventDefault();
    const { email, name, password } = this.state;
    let message, title, details;

    switch (false) {
      case validateEmail(email):
        message = "invalidEmail";
        title = "signup";
        break;
      case name.length >= 6:
        message = "minLengthGeneric";
        title = "minimumLength";
        details = {
          number: 6,
          name: "username"
        };
        break;
      case password.length >= 8:
        message = "minLengthGeneric";
        title = "minimumLength";
        details = {
          number: 8,
          name: "password"
        };
        break;
      default:
        break;
    }
    message
      ? this.props.createNotification("warning", message, title, details)()
      : this.onSubmit(mutation);
  };

  onSubmit = async mutation => {
    const { email, name, password } = this.state;
    await mutation({ variables: { email, name, password } });
  };

  handleInput = (e, key) => this.setState({ [key]: e.target.value });

  handleSignup = signup => {
    switch (signup) {
      case "1":
        this.props.createNotification(
          "warning",
          "nameTaken",
          "nameTaken",
          {}
        )();
        break;
      case "2":
        this.props.createNotification(
          "warning",
          "emailTaken",
          "emailTaken",
          {}
        )();
        break;
      case "3":
        this.props.createNotification(
          "warning",
          "nameTaken",
          "nameTaken",
          {}
        )();
        this.props.createNotification(
          "warning",
          "emailTaken",
          "emailTaken",
          {}
        )();
        break;
      default:
        signup && localStorage.setItem("token", signup);
        this.props.history.push("/main/new-project");
    }
    // TODO is the right ux?
    this.setState(this.initialState);
  };

  render() {
    const { name, email, password, errors } = this.state;
    return (
      <AuthWrapper>
        <Title>Signup</Title>
        <Mutation
          mutation={SIGNUP}
          onCompleted={result => this.handleSignup(result.signup)}
        >
          {Signup => (
            <form onSubmit={e => this.validation(e, Signup)}>
              <InputField>
                <LabelText>Username</LabelText>
                <input
                  value={name}
                  onChange={e => this.handleInput(e, "name")}
                />
              </InputField>
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
              {/* <Errors errors={errors} from='SignupForm' /> */}
              {/* <SubmitButton>Submit</SubmitButton> */}
            </form>
          )}
        </Mutation>
      </AuthWrapper>
    );
  }
}

export default SignupForm;
