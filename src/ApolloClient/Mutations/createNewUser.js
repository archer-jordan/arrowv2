// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import userFragment from 'ApolloClient/Fragments/userFragment';

export default gql`
  mutation createNewUser($params: UserParams) {
    createNewUser(params: $params) {
      ...userFragment
    }
  }
  ${userFragment}
`;
