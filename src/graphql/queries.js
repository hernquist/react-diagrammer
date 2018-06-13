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

export { GET_AUTH_USER };