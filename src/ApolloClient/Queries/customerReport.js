// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  query customerReport($month: String!, $year: String!, $customerId: ID!) {
    customerReport(month: $month, year: $year, customerId: $customerId) {
      assignedId
      month
      year
      activeThisMonth
      # totals
      totalHours
      totalFringe
      totalHealthAndWelfare
      totalVHS
      totalEmployees
      # labels
      labelForVHS
      labelForAdminCosts
      # benefits
      benefits {
        label
        value
        employees
      }
    }
  }
`;
