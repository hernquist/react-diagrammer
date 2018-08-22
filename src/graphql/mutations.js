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
        _id
        name
        proptype
      }
    }
  }
`;

const DELETE_PROP = gql`
  mutation DeleteProp($_id: String!) {
    deleteProp(_id: $_id)
  }
`;

const EDIT_PROP = gql`
  mutation EditProp($_id: String, $name: String, $proptype: PropType) {
    editProp(_id: $_id, name: $name, proptype: $proptype) {
      _id
      name
      proptype
      componentId
    }
  }
`;

// const ADD_PROP = gql`
//   mutation AddProp($prop: InputProp) {
//     addProp(prop: $prop) {
//       _id
//       props {
//         _id
//         name
//         proptype
//       }
//     }
//   }
// `;

// const DELETE_PROP = gql`
//   mutation DeleteProp($_id: String!) {
//     deleteProp(_id: $_id)
//   }
// `;

// const EDIT_PROP = gql`
//   mutation EditProp($_id: String, $name: String, $proptype: PropType) {
//     editProp(_id: $_id, name: $name, proptype: $proptype) {
//       _id
//       name
//       proptype
//       componentId
//     }
//   }
// `;

export { 
  SIGNUP, 
  LOGIN, 
  CREATE_PROJECT,
  TOGGLE_COMPONENT_STYLE,
  EDIT_COMPONENT_NAME,
  ADD_PROP,
  DELETE_PROP,
  EDIT_PROP
};
