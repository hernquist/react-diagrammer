import React, { Component } from 'react';

class LogoutForm extends Component {
    logout = () => {
        localStorage.removeItem("token");
        this.props.history.push("/login");
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

export default LogoutForm;