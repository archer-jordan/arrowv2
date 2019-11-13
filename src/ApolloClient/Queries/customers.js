// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import customerFragment from 'ApolloClient/Fragments/customerFragment';

export default gql`
  query customers($searchText: String, $skip: Int) {
    customers(searchText: $searchText, skip: $skip) {
      count
      customers {
        ...customerFragment
      }
    }
  }
  ${customerFragment}
`;
