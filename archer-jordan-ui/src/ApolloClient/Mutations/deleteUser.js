// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import userFragment from 'ApolloClient/Fragments/userFragment';

export default gql`
  mutation deleteUser($id: ID) {
    deleteUser(id: $id) {
      ...userFragment
    }
  }
  ${userFragment}
`;
