// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import userFragment from 'ApolloClient/Fragments/userFragment';

export default gql`
  mutation saveUser($id: ID!, $params: UserParams) {
    saveUser(id: $id, params: $params) {
      ...userFragment
    }
  }
  ${userFragment}
`;
