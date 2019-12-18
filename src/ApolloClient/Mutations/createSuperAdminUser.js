// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import userFragment from 'ApolloClient/Fragments/userFragment';

export default gql`
  mutation createSuperAdminUser($params: UserParams) {
    createSuperAdminUser(params: $params) {
      ...userFragment
    }
  }
  ${userFragment}
`;
