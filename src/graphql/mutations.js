import gql from "graphql-tag";

const SIGNUP = gql`
  mutation Signup($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      _id
      email
      name
    }
  }
`;
const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;

export {SIGNUP, LOGIN}
