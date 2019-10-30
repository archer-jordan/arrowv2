// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import customerFragment from 'ApolloClient/Fragments/customerFragment';

export default gql`
  mutation saveCustomer($id: ID, $params: CustomerParams) {
    saveCustomer(id: $id, params: $params) {
      ...customerFragment
    }
  }
  ${customerFragment}
`;
