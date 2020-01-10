// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation newEmployeesUpload($customerId: ID!, $employees: [EmployeeParams]) {
    newEmployeesUpload(customerId: $customerId, employees: $employees) {
      success
      errors
    }
  }
`;
