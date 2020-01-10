// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation deleteCustomer($customerId: ID!) {
    deleteCustomer(customerId: $customerId) {
      success
    }
  }
`;
