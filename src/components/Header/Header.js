import React, { Component } from 'react';
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { GET_AUTH_USER } from "../../graphql/queries"

class Header extends Component {
    render() {
        return (
            <div className="header-container">
                <Query 
                    query={GET_AUTH_USER}
                    fetchPolicy="cache"
                >
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    console.log("[Header]", data.getAuthUser);
                    if (!data.getAuthUser) {
                        return <div>NOT LOGGED IN</div>
                    }
                    return <div>
                        <div> {data.getAuthUser.name} </div>
                        <Link to="/logout">LOGOUT</Link>
                    </div>;
                }}
                </Query>
            </div>
        )
    }
}

export default Header;