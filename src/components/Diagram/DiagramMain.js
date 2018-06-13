import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_AUTH_USER } from '../../graphql/queries';

class DiagramMain extends Component {
    render() {
        return (
            <div>
                DiagramMain
                <Query query={GET_AUTH_USER}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;
                        console.log(data);
                        return <div>Query working</div>;
                    }}
                </Query>
            </div>
        );
    }
}

export default DiagramMain;