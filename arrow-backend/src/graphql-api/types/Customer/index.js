import {gql} from 'apollo-server';
import Users from 'collections/Users/model';

export const CustomerResolvers = {
  Customer: {
    id: (root) => root._id,
    adminUsers: async (root, args, context) => {
      let roles = ['coAdmin'];
      return await Users.find({customerId: root._id, roles: {$in: roles}});
    },
  },
};

export const CustomerSchema = gql`
  enum CompanyTypeEnum {
    llc
    cCorp
    sCorp
    llp
    other
  }

  enum CustomerStatusEnum {
    pending
    active
    disabled
    archived
  }

  enum PlanTypeEnum {
    "Arrow Care (default plan)'"
    arrowCare
    "Arrow Care Plus"
    arrowCarePlus
  }

  type Contact {
    id: String
    firstName: String
    lastName: String
    title: String
    phone: String
    email: String
  }

  input ContactInput {
    id: String
    firstName: String
    lastName: String
    title: String
    phone: String
    email: String
  }

  input CustomerParams {
    title: String
    ein: String
    assignedId: String
    companyType: CompanyTypeEnum
    naics: String
    sic: String
    # location
    street: String
    zip: String
    state: String
    city: String
    status: CustomerStatusEnum
    contacts: [ContactInput]
    planType: PlanTypeEnum
    enrollmentWindowStart: String
    enrollmentWindowEnd: String
  }

  type Customer {
    id: String
    assignedId: String
    title: String
    ein: String
    naics: String
    sic: String
    companyType: CompanyTypeEnum
    status: CustomerStatusEnum
    # location
    street: String
    zip: String
    state: String
    city: String
    # attachments
    contacts: [Contact]
    referralPartnerId: String
    referralStartDate: String
    referralEndDate: String
    adminUsers: [UserProfile]
    planType: PlanTypeEnum
    enrollmentWindowStart: String
    enrollmentWindowEnd: String
  }
`;
