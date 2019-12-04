// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  query employeeReportByEmployeeId(
    $month: String!
    $year: String!
    $employeeId: ID!
  ) {
    employeeReportByEmployeeId(
      month: $month
      year: $year
      employeeId: $employeeId
    ) {
      id
      employeeId
      customerId
      month
      year
      hours
      fringeDollars
      healthAndWelfare
      retirement
      benefits {
        label
        eligibility
        hours
      }
    }
  }
`;
