// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import userFragment from 'ApolloClient/Fragments/userFragment';

export default gql`
  mutation createUserProfile($userId: ID!, $role: String) {
    createUserProfile(userId: $userId, role: $role) {
      ...userFragment
    }
  }
  ${userFragment}
`;
