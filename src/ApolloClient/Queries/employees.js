// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import employeeFragment from 'ApolloClient/Fragments/employeeFragment';

export default gql`
  query employees(
    $customerId: String!
    $searchText: String
    $skip: Int
    $limit: Int
    $sortBy: SortByEnum
  ) {
    employees(
      customerId: $customerId
      searchText: $searchText
      skip: $skip
      limit: $limit
      sortBy: $sortBy
    ) {
      count
      employees {
        ...employeeFragment
        ssn
      }
    }
  }
  ${employeeFragment}
`;
