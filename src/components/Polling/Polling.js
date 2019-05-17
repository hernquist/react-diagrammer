import React from "react";
import { Query } from "react-apollo";
import { GET_PROJECTS } from "../../graphql/queries";
import ManagePolling from "./ManagePolling";

const Polling = ({ history }) => (
  <Query query={GET_PROJECTS} fetchPolicy="cache-first">
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error! ${error}`;

      return <ManagePolling projects={data.getProjects} history={history} />;
    }}
  </Query>
);

export default Polling;
