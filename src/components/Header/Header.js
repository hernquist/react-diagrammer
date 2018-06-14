import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_AUTH_USER } from "../../graphql/queries"

class Header extends Component {
    render() {
        return <div className="header-container">
            <Query 
                query={GET_AUTH_USER}
                fetchPolicy="cache" 
            >
              {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                console.log(data);
                return <div>Query working</div>;
              }}
            </Query>
            <div>REACT DIAGRAMMER</div>
            <div />
          </div>;
    }
}

export default Header;