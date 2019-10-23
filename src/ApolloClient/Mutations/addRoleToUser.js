// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import userFragment from 'ApolloClient/Fragments/userFragment';

export default gql`
  mutation addRoleToUser($userId: ID!, $role: String!) {
    addRoleToUser(userId: $userId, role: $role) {
      ...userFragment
    }
  }
  ${userFragment}
`;
