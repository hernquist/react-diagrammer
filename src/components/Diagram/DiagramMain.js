import React, { Component } from 'react';
import { Query } from "react-apollo";
import auth from "../HOC/auth"
import { GET_AUTH_USER } from '../../graphql/queries';

class DiagramMain extends Component {
  render() {
    return <div>
      DiagramMain
      <Query query={GET_AUTH_USER}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error: ${error}` 

          return <div>
            Query working
          </div>;
        }}
      </Query>
    </div>
  }
}

export default auth(DiagramMain);