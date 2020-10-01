import {gql} from 'apollo-server';
import Users from 'collections/Users/model';
import Customers from 'collections/Customers/model';

export const ReferralPartnerResolvers = {
  ReferralPartner: {
    id: (root) => root._id, // mongo uses _id as the primary key field, for simplifying the UI we change this to be just id
    email: async (root) => {
      let user = await Users.findOne({_id: root.userId});
      return user.emails[0].address;
    },
    firstName: async (root) => {
      let user = await Users.findOne({_id: root.userId});
      return user.firstName;
    },
    lastName: async (root) => {
      let user = await Users.findOne({_id: root.userId});
      return user.lastName;
    },
    customers: async (root) => {
      let results = await Customers.find({referralPartnerId: root._id});
      return results;
    },
  },
};

export const ReferralPartnerSchema = gql`
  enum ReferralPartnerStatus {
    approved
    pending
  }

  enum ReferralPartnerType {
    lifeAndHealthBroker
    propertyAndCasualty
    investmentAdvisor
    cpa
    attorney
    consultant
    industryInfluencer
    other
  }

  input ReferralPartnerParams {
    applicationSubmittedDate: String
    firstName: String
    lastName: String
    email: String
    phone: String
    partnerType: ReferralPartnerType
    w9Doc: AttachmentParams
    achDoc: AttachmentParams
    parterAgreementDoc: AttachmentParams
    status: ReferralPartnerStatus
    address: String
    city: String
    state: String
    zip: String
    minimumReferralHours: Int
    referralRate: Int
  }

  type ReferralPartner {
    id: String
    applicationSubmittedDate: String
    firstName: String
    lastName: String
    email: String
    phone: String
    partnerType: ReferralPartnerType
    w9Doc: Attachment
    achDoc: Attachment
    parterAgreementDoc: Attachment
    status: ReferralPartnerStatus
    address: String
    city: String
    minimumReferralHours: Int
    referralRate: Int
    state: String
    zip: String
    customers: [Customer]
  }
`;
