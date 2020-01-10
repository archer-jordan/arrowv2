import {gql} from 'apollo-server';

export const CustomerReportResolvers = {
  CustomerReport: {
    id: root => root._id,
  },
};

export const CustomerReportSchema = gql`
  input BenefitUpload {
    label: String
    value: String
    employees: String
  }

  type BenefitDataPoint {
    label: String
    value: String
    employees: String
  }

  input CustomerReportParams {
    assignedId: String
    month: String
    year: String
    activeThisMonth: String
    # totals
    totalHours: String
    totalFringe: String
    totalHealthAndWelfare: String
    totalVHS: String
    totalEmployees: String
    totalRetirement: String
    totalFringeBenefitsSpend: String
    totalHealthAndWelfareLabel: String
    # labels
    labelForTotalFringe: String
    labelForTotalHours: String
    labelForVHS: String
    labelForAdminCosts: String
    labelForTotalRetirement: String
    totalFringeBenefitsSpendLabel: String
    # captions
    captionForHealthAndWelfare: String
    captionForEligibility: String
    captionForBenefits: String
    #
    benefits: [BenefitUpload]
    eligibility: [BenefitUpload]
  }

  type CustomerReport {
    id: String
    customerId: String
    month: String
    year: String
    activeThisMonth: String
    # totals
    totalHours: String
    totalFringe: String
    totalHealthAndWelfare: String
    totalVHS: String
    totalEmployees: String
    totalRetirement: String
    totalFringeBenefitsSpend: String
    totalHealthAndWelfareLabel: String
    # captions
    "This caption is used on both the benefits tab and health & welfare tab"
    captionForHealthAndWelfare: String
    captionForEligibility: String
    captionForBenefits: String
    labelForAdminCosts: String
    # labels
    labelForTotalFringe: String
    labelForTotalHours: String
    labelForVHS: String

    labelForTotalRetirement: String
    totalFringeBenefitsSpendLabel: String
    # benefits
    benefits: [BenefitDataPoint]
    eligibility: [BenefitDataPoint]
  }
`;
