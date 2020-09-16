import {gql} from 'apollo-server';

export const ReferralPartnerResolvers = {
  ReferralPartner: {
    id: (root) => root._id, // mongo uses _id as the primary key field, for simplifying the UI we change this to be just id
  },
};

export const ReferralPartnerSchema = gql`
  enum ReferralPartnerStatus {
    approved
    pending
  }

  enum ReferralPartnerType {
    lifeAndHealthBroker
    propertyAndCasualaty
    investmentAdvisor
    cpa
    attorney
    consultant
    industryInfluencer
    other
  }

  type ReferralPartner {
    id: String
    applicationSubmittedDate: String
    firstName: String
    lastName: String
    phone: String
    partnerType: ReferralPartnerType
    # w9Doc: attachmentSchema,
    # achDoc: attachmentSchema,
    # parterAgreementDoc: attachmentSchema,
    # status: ReferralPartnerStatus
  }
`;
