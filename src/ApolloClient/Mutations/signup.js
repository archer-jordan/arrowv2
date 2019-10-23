// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(user: $user)
  }
`;
