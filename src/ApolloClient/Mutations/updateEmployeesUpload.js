// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation updateEmployeesUpload($employees: [EmployeeParams]) {
    updateEmployeesUpload(employees: $employees) {
      success
    }
  }
`;
