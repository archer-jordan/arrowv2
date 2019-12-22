// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  query checkIfEmployeeTotalsExist(
    $month: String!
    $year: String!
    $employeeAssignedIds: [String]
    $customerId: String!
  ) {
    checkIfEmployeeTotalsExist(
      month: $month
      year: $year
      customerId: $customerId
      employeeAssignedIds: $employeeAssignedIds
    ) {
      exists
      errors
    }
  }
`;
