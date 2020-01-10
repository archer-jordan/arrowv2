// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import userFragment from 'ApolloClient/Fragments/userFragment';

export default gql`
  query users($customerId: String, $searchText: String, $roles: [String]) {
    users(customerId: $customerId, searchText: $searchText, roles: $roles) {
      count
      users {
        ...userFragment
        createdByEmail
      }
    }
  }
  ${userFragment}
`;
