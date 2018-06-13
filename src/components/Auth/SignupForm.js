import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNUP } from "../../mutations/Signup";

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
        const { name, email, password} = this.state;
        await Signup({ variables: { name, email, password } });
        this.props.history.push('/main');
    };

  render() {
    const { name, email, password, errors } = this.state;
    return <div>
        <h3>Signup</h3>
        <Mutation mutation={SIGNUP} onCompleted={result => {
            if (result.createUser) {
              localStorage.setItem("id", result.createUser._id);
            }
            this.props.history.push("./main");
          }}>
          {Signup => <form onSubmit={e => this.onSubmit(e, Signup)}>
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
                {errors.map(error => <div key={error}>{error}</div>)}
              </div>
              <button variant="raised">Submit</button>
            </form>}
        </Mutation>
      </div>;
    }
}

export default SignupForm;
