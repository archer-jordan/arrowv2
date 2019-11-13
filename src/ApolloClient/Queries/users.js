// TOP LEVEL IMPORTS
import gql from "graphql-tag";
import userFragment from "ApolloClient/Fragments/userFragment";

export default gql`
  query users($customerId: String!, $searchText: String) {
    users(customerId: $customerId, searchText: $searchText) {
      count
      users {
        ...userFragment
      }
    }
  }
  ${userFragment}
`;
