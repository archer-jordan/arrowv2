// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  query employeeIdAlreadyExists($customerId: String!, $assignedId: String!) {
    employeeIdAlreadyExists(customerId: $customerId, assignedId: $assignedId) {
      exists
    }
  }
`;
