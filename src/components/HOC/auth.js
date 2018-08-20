import React, { Component } from "react";
import { graphql } from "react-apollo";
import { GET_AUTH_USER } from "../../graphql/queries";

export default WrappedComponent => {
  class Auth extends Component {
    
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.getAuthUser) {
        this.props.history.push("/login");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(GET_AUTH_USER)(Auth);
};
