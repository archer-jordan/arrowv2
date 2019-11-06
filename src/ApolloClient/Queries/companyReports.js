// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  query companyReports($month: String!, $year: String!, $companyId: ID!) {
    companyReports(month: $month, year: $year, companyId: $companyId) {
      totalHours
      totalFringe
      month
      year
      totalHealthAndWelfare
      totalVHS
    }
  }
`;
