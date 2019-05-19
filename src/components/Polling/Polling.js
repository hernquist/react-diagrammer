import React from "react";
import { Query } from "react-apollo";
import { GET_PROJECTS_FOR_POLLING } from "../../graphql/queries";
import ManagePolling from "./ManagePolling";

const Polling = ({ history, visible }) => {
  if (!visible) return null;

  return (
    <Query query={GET_PROJECTS_FOR_POLLING} fetchPolicy="cache-first">
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error! ${error}`;

        return (
          <ManagePolling
            projects={data.getProjectsForPolling}
            history={history}
          />
        );
      }}
    </Query>
  );
};

export default Polling;
