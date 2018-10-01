import { gql } from 'apollo-boost';

/* Recipe's Queries */
export const GET_ALL_RECIPES = gql`
    query {
        getAllRecipes {
            _id
            name
            category
            description
            instructions
            createdDate
            username
            likes
        }
    }
`;

/* Recipe's Mutations */

/* User's Queries */

/* User's Mutations */
export const SIGNIN_USER = gql`
    mutation($username: String!, $password: String!) {
        signinUser(username: $username, password: $password) {
            token
        }
    }
`;

export const SIGNUP_USER = gql`
    mutation($username: String!, $password: String!, $email: String!) {
        signupUser(username: $username, email: $email, password: $password) {
            token
        }
    }
`;
