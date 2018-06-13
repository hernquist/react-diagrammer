import React, { Component } from "react";
import { Mutation } from "react-apollo";
import SIGNUP from "../../mutations/Signup";

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

  onSubmit = async (event, signup) => {
    event.preventDefault();
    console.log("clicked");
    const { name, email, password} = this.state;
    await signup({ variables: { name, email, password } });
  };

  render() {
    return <div>
        <h3>Signup</h3>
        <Mutation mutation={SIGNUP} onCompleted={result => {
            if (result.createUser) {
              localStorage.setItem("id", result.createUser._id);
            }
            this.props.history.push("./main");
          }}>
          {Signup => <form onSubmit={(e) => this.onSubmit(e, Signup)} className="col s4">
              <div className="input-field">
                <input value={this.state.name} onChange={e => this.setState(
                      { name: e.target.value }
                    )} />
              </div>
              <div className="input-field">
                <input value={this.state.email} onChange={e => this.setState(
                      { email: e.target.value }
                    )} />
              </div>
              <div className="input-field">
                <input value={this.state.password} onChange={e => this.setState(
                      { password: e.target.value }
                    )} />
              </div>

              <div className="errors">
                {this.state.errors.map(error => (
                  <div key={error}>{error}</div>
                ))}
              </div>
              <button variant="raised">Submit</button>
            </form>}
        </Mutation>
      </div>;
  }
}

export default SignupForm;
