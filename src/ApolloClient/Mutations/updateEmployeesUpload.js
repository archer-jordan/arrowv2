// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation updateEmployeesUpload(
    $customerId: ID!
    $employees: [EmployeeParams]
  ) {
    updateEmployeesUpload(customerId: $customerId, employees: $employees) {
      success
      errors
    }
  }
`;
