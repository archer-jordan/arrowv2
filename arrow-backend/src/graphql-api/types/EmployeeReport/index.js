import {gql} from 'apollo-server';

export const EmployeeReportResolvers = {
  EmployeeReport: {
    id: root => root._id,
  },
};

export const EmployeeReportSchema = gql`
  input EmployeeReportBenefitInput {
    label: String
    hours: String
    eligibility: Boolean
  }

  type EmployeeReportBenefit {
    label: String
    hours: String
    eligibility: Boolean
  }

  input EmployeeReportParams {
    assignedId: String
    companyAssignedId: String
    month: String
    year: String
    hours: String
    fringeDollars: String
    healthAndWelfare: String
    retirement: String
    benefits: [EmployeeReportBenefitInput]
    fringeDollarsLabel: String
    healthAndWelfareLabel: String
    retirementLabel: String
  }

  type EmployeeReport {
    id: String
    "the database id of the employee"
    employeeId: String
    "the database id of the customer/company"
    customerId: String
    month: String
    year: String
    hours: Float
    fringeDollars: String
    healthAndWelfare: String
    retirement: String
    benefits: [EmployeeReportBenefit]
    fringeDollarsLabel: String
    healthAndWelfareLabel: String
    retirementLabel: String
  }
`;
