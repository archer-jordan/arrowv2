// TOP LEVEL IMPORTS
import gql from "graphql-tag";
import employeeFragment from "ApolloClient/Fragments/employeeFragment";

export default gql`
  query employees(
    $customerId: String!
    $searchText: String
    $skip: Int
    $limit: Int
  ) {
    employees(
      customerId: $customerId
      searchText: $searchText
      skip: $skip
      limit: $limit
    ) {
      count
      employees {
        ...employeeFragment
      }
    }
  }
  ${employeeFragment}
`;
