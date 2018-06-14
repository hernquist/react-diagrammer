import React, { Component } from 'react';
import { withApollo, graphql } from "react-apollo";

class LogoutForm extends Component {
    constructor(props) {
        super(props);
    }

    logout = async () => {
        // await this.props.client.resetStore();
        await this.props.client.cache.reset();
        localStorage.removeItem("token");
        console.log("logged out")
        // this.props.history.push("/login");

    }

    render() {
        const { history } = this.props; 
        return <div>
            <h3>Logout</h3>
            <p> Are you sure you want to logout? </p>
            <div>
                <button onClick={this.logout}>YES</button>
                <button onClick={() => history.goBack()}>NO</button>
            </div>
        </div>
    }
}

export default withApollo(LogoutForm);