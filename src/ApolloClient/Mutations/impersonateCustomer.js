// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation impersonateCustomer($customerId: String!, $turnOff: Boolean) {
    impersonateCustomer(customerId: $customerId, turnOff: $turnOff) {
      success
      errors
    }
  }
`;
