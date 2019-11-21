// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

// checks if any of the emails in a CSV already exist in the database
export default gql`
  mutation checkEmployeesCSV($values: [EmpoyeeUploadCheckParams]) {
    checkEmployeesCSV(values: $values) {
      success
      errors
    }
  }
`;
