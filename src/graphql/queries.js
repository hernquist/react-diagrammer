import gql from "graphql-tag";

const GET_AUTH_USER = gql`
  {
    getAuthUser {
      _id
      name
      email
      password
    }
  }
`;

const PROJECTS_BY_USER_ID = gql`
  query ProjectsByUserId($userId: String!) {
    projectsByUserId(userId: $userId) {
      _id
      name
      description
      dateCreated
      dateVisited
      components {
        _id
        name
        iteration
        projectId
        style
        placement
        children
        state {
          _id
          name
          statetype
          componentId
        }
        props {
          _id
          name
          proptype
          componentId
        }
        callbacks {
          _id
          name
          functionArgs {
            name
            typeName
          }
          setState {
            stateField
            stateChange
          }
          description
        }
      }
    }
  }
`;

const GET_PROJECTS_FOR_POLLING = gql`
  query {
    getProjectsForPolling {
      _id
      name
      description
      dateCreated
      dateVisited
      components {
        _id
        name
        iteration
        projectId
        style
        placement
        children
        state {
          _id
          name
          statetype
          componentId
        }
        props {
          _id
          name
          proptype
          componentId
        }
        callbacks {
          _id
          name
          functionArgs {
            name
            typeName
          }
          setState {
            stateField
            stateChange
          }
          description
        }
      }
    }
  }
`;

const FETCH_STATE = gql`
  query StateByComponentId($id: String!) {
    stateByComponentId(componentId: $id) {
      _id
      name
      statetype
    }
  }
`;

const FETCH_PROPS = gql`
  query PropsByComponentId($id: String!) {
    propsByComponentId(componentId: $id) {
      _id
      name
      proptype
    }
  }
`;

const FETCH_CALLBACKS = gql`
  query CallbacksByComponentId($id: String!) {
    callbacksByComponentId(componentId: $id) {
      _id
      name
      setState {
        stateField
        stateChange
      }
      functionArgs {
        name
        typeName
      }
      description
    }
  }
`;

export {
  GET_AUTH_USER,
  PROJECTS_BY_USER_ID,
  FETCH_STATE,
  FETCH_PROPS,
  FETCH_CALLBACKS,
  GET_PROJECTS_FOR_POLLING
};
