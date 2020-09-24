// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  query referralReports($partnerId: ID!, $month: String, $year: String) {
    referralReports(partnerId: $partnerId, month: $month, year: $year) {
      id
      companyName
      hours
      eligibleEmployees
      rate
    }
  }
`;
// id: String
// "date the report was created"
// date: String
// companyName: String
// month: String
// year: String
// "holds a stringified array of the 'employee reports' that qualified for this report"
// employeesMeta: String
// "the hours for that month"
// hours: Int
// "the number of employees who met the minimum hours"
// eligibleEmployees: Int
// " the rate paid, originally will be $12 per employee"
// rate: Int
