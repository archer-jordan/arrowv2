import {gql} from 'apollo-server';
import Customers from 'collections/Customers/model';

export const ReferralReportResolvers = {
  ReferralReport: {
    id: (root) => root._id, // mongo uses _id as the primary key field, for simplifying the UI we change this to be just id
    companyName: async ({customerId}) => {
      let cust = await Customers.findOne({
        _id: customerId,
      });
      return cust.title;
    },
    customer: async (root) => {
      return await Customers.findOne({_id: root.customerId});
    },
  },
};

export const ReferralReportSchema = gql`
  type ReferralReport {
    id: String
    "date the report was created"
    date: String
    companyName: String
    month: String
    year: String
    "holds a stringified array of the 'employee reports' that qualified for this report"
    employeesMeta: String
    "the hours for that month"
    hours: Int
    "the number of employees who met the minimum hours"
    eligibleEmployees: Int
    " the rate paid, originally will be $12 per employee"
    rate: Int
    customer: Customer
  }
`;
