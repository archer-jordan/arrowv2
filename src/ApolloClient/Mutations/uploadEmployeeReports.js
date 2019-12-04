// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation uploadEmployeeReports($values: [EmployeeReportParams]) {
    uploadEmployeeReports(values: $values) {
      success
      errors
    }
  }
`;
