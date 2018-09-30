import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP } from '../../graphql/mutations';
import { validateEmail } from '../../helpers/validations';

class SignupForm extends Component {
    constructor(props) {
      super(props);
        this.state = { 
            errors: [],
            email: '',
            name: '',
            password: '' 
        };
    }

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
      : this.onSubmit(event, mutation)
    }

    onSubmit = async (event, mutation) => {
        const { email, name, password } = this.state;
        await mutation({ variables: { email, name, password } });
    };

  render() {
    const { name, email, password, errors } = this.state;
    return <div>
        <h2>Signup</h2>
        <Mutation 
            mutation={SIGNUP}
            onCompleted={result => {
                result.signup && localStorage.setItem("token", result.signup);
                this.props.history.push("/main/new-project");
            }}
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
