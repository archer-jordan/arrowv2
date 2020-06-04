// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation deleteEmployee($employeeId: ID!) {
    deleteEmployee(employeeId: $employeeId) {
      success
    }
  }
`;
