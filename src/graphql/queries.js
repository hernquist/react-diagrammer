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
      state
      props {
        _id
        name
        proptype
      }
      callbacks
    }
  }
}
`;

export { 
  GET_AUTH_USER,
  PROJECTS_BY_USER_ID
};