import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP } from '../../graphql/mutations';
import { validateEmail } from '../../helpers/validations';

class SignupForm extends Component {
  initialState = {
    errors: [],
    email: '',
    name: '',
    password: ''
  }
  
  state = this.initialState;

  validation = (event, mutation) => {
    event.preventDefault();
    const { email, name, password } = this.state;
    let message, title, details;

    switch (false) {
      case validateEmail(email):
        message = 'invalidEmail';
        title = 'signup';
        break;
      case name.length >= 6:
        message = 'minLengthGeneric';
        title = 'minimumLength';
        details = {
          number: 6,
          name: 'username'
        };
        break;
      case password.length >= 8:
        message = 'minLengthGeneric';
        title = 'minimumLength';
        details = {
          number: 8,
          name: 'password'
        };
        break;
      default:
        break;
    }

    message ? this.props.createNotification('warning', message, title, details)()
    : this.onSubmit(mutation)
  }

  onSubmit = async (mutation) => {
      const { email, name, password } = this.state;
      await mutation({ variables: { email, name, password } });
  };

  handleSignup = signup => {
    console.log(signup);
    switch (signup) {
      case '1':
        this.props.createNotification('warning', 'nameTaken', 'nameTaken', {})();
        break;
      case '2':
        this.props.createNotification('warning', 'emailTaken', 'emailTaken', {})();
        break;
      case '3':
        this.props.createNotification('warning', 'nameTaken', 'nameTaken', {})();
        this.props.createNotification('warning', 'emailTaken', 'emailTaken', {})();
        break;
      default:
        signup && localStorage.setItem("token", signup);
        this.props.history.push("/main/new-project");
        break;
      }
  // TODO is the right ux
  this.setState(this.initialState);
  }

  render() {
    const { name, email, password, errors } = this.state;
    return <div>
        <h2>Signup</h2>
        <Mutation 
          mutation={SIGNUP}
          onCompleted={result => this.handleSignup(result.signup)}
        >
          {Signup => <form onSubmit={e => this.validation(e, Signup)} >
              <div className="input-field">
                <label>Name</label>
                <input value={name} onChange={e => this.setState({
                      name: e.target.value
                    })} />
              </div>
              <div className="input-field">
                <label>Email</label>
                <input value={email} onChange={e => this.setState({
                      email: e.target.value
                    })} />
              </div>
              <div className="input-field">
                <label>Password</label>
                <input value={password} onChange={e => this.setState({
                      password: e.target.value
                    })} />
              </div>
              <div className="errors">
                {errors.map(error => <div key={error}>SIGNUP: {error}</div>)}
              </div>
              <button variant="raised">Submit</button>
            </form>}
        </Mutation>
      </div>;
    }
}

export default SignupForm;
