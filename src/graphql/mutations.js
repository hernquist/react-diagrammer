import gql from "graphql-tag";

const SIGNUP = gql`
  mutation Signup($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password)
  }
`;

const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;

const CREATE_PROJECT = gql`
  mutation CreateProject($userId: String!, $name: String!, $description: String!){
    createProject(userId: $userId, name: $name, description: $description) {
      _id
      userId
      name
      description
      dateCreated
      dateVisited
    }
  }
`;

// just filler must do
const DELETE_PROJECT = gql`
  mutation DeleteProject($userId: String!, $name: String!, $description: String!){
    deleteProject(userId: $userId, name: $name, description: $description) {
      _id
      userId
      name
      description
      dateCreated
      dateVisited
    }
  }
`;

const TOGGLE_COMPONENT_STYLE = gql`
  mutation ToggleComponentStyle($_id: String!) {
    toggleComponentStyle(_id: $_id) {
      _id
      name
      projectId
      style
      state
      iteration
      placement
      props {
        name
        proptype
      }
      callbacks
      children
    }
  }
`;

const EDIT_COMPONENT_NAME = gql`
  mutation EditComponentName($_id: String!, $name: String!) {
    editComponentName(_id: $_id, name: $name) {
      _id
      name
      projectId
      style
      state
      iteration
      placement
      props {
        name
        proptype
      }
      callbacks
      children
    }
  }
`;

const ADD_PROP = gql`
  mutation AddProp($prop: InputProp) {
    addProp(prop: $prop) {
      _id
      props {
        name
        proptype
      }
    }
  }
`

export { 
  SIGNUP, 
  LOGIN, 
  CREATE_PROJECT,
  DELETE_PROJECT,
  TOGGLE_COMPONENT_STYLE,
  EDIT_COMPONENT_NAME,
  ADD_PROP,
};
