import gql from "graphql-tag";

export default gql`
  mutation Signup($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      _id
      email
      name
    }
  }
`;
