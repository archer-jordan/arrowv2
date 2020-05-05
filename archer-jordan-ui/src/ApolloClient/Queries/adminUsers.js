// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import userFragment from 'ApolloClient/Fragments/userFragment';

export default gql`
  query adminUsers($searchText: String) {
    adminUsers(searchText: $searchText) {
      count
      users {
        ...userFragment
        createdByEmail
      }
    }
  }
  ${userFragment}
`;
