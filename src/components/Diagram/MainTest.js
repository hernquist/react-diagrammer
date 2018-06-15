import React, { Component } from 'react';
import auth from "../HOC/auth";

class MainTest extends Component {
    render() {
        return (
            <div>
                MainTest
            </div>
        );
    }
}

export default auth(MainTest);