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
    captionForEligibility
    captionForBenefits
    # labels
    labelForTotalFringe
    totalFringeBenefitsSpend
    totalFringeBenefitsSpendLabel
    labelForTotalHours
    labelForVHS
    labelForAdminCosts
    labelForTotalRetirement
    totalHealthAndWelfareLabel
    # benefits
    benefits {
      label
      value
    }
    # eligibility
    eligibility {
      label
      employees
    }
  }
`;
