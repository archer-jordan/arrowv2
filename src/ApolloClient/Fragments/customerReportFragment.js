// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  fragment customerReportFragment on CustomerReport {
    id
    customerId
    month
    year
    activeThisMonth
    # totals
    totalHours
    totalFringe
    totalHealthAndWelfare
    totalVHS
    totalEmployees
    totalRetirement
    totalFringeBenefitsSpend
    #captions
    captionForHealthAndWelfare
    # labels
    labelForTotalFringe
    totalFringeBenefitsSpend
    totalFringeBenefitsSpendLabel
    labelForTotalHours
    labelForVHS
    labelForAdminCosts
    labelForTotalRetirement
    # benefits
    benefits {
      label
      value
      employees
    }
  }
`;
