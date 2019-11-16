// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import customerFragment from 'ApolloClient/Fragments/customerFragment';

export default gql`
  query customers($searchText: String, $skip: Int, $sortBy: SortByEnum) {
    customers(searchText: $searchText, skip: $skip, sortBy: $sortBy) {
      count
      customers {
        ...customerFragment
      }
    }
  }
  ${customerFragment}
`;
