// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import userFragment from 'ApolloClient/Fragments/userFragment';

export default gql`
  mutation deleteHome($id: ID) {
    deleteUser(id: $id) {
      ...userFragment
    }
  }
  ${userFragment}
`;