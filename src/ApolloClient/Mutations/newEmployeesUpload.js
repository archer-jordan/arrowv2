// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation newEmployeesUpload($employees: [EmployeeParams]) {
    newEmployeesUpload(employees: $employees) {
      success
      errors
    }
  }
`;
