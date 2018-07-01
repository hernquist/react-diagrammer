import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNUP } from "../../graphql/mutations";

class SignupForm extends Component {
    constructor(props) {
      super(props);
        this.state = { 
            errors: [],
            email: "",
            name: "",
            password: "" 
        };
    }

    onSubmit = async (event, Signup) => {
        event.preventDefault();
        const { email, name, password } = this.state;
        await Signup({ variables: { email, name, password } });
    };

  render() {
    const { name, email, password, errors } = this.state;
    return <div>
        <h3>Signup</h3>
        <Mutation 
            mutation={SIGNUP}
            onCompleted={result => {
                result.signup && localStorage.setItem("token", result.signup);
                this.props.history.push("/main/new-project");
            }}
        >
          {Signup => <form onSubmit={e => this.onSubmit(e, Signup)} >
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
