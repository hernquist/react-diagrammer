import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { LOGIN } from "../../graphql/mutations";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            email: "",
            password: ""
        }
    }

    onSubmit = async (event, Login) => {
        event.preventDefault();
        const {email, password} = this.state;
        const { data } = await Login({ variables: { email, password } });
        console.log("[LoginForm]", data.login);
        localStorage.setItem("token", data.login);
        // this.props.history.push('./main');
    }

    render() {
        const {email, password, errors} = this.state;
        return <div>
            <h3>Login</h3>
            <Mutation mutation={LOGIN}>
                {Login => <form onSubmit={e => this.onSubmit(e, Login)}>
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
        </div>
    }
}

export default LoginForm;