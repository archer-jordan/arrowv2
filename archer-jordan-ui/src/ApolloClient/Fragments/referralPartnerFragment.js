// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  fragment referralPartnerFragment on ReferralPartner {
    id
    __typename
    email
    firstName
    lastName
    applicationSubmittedDate
    phone
    partnerType
    status
    address
    city
    state
    zip
    attachments {
      id: filename
      filename
      mimetype
      url
      key
    }
    # w9Doc {
    #   id: filename
    #   filename
    #   mimetype
    #   url
    # }
    # achDoc {
    #   id: filename
    #   filename
    #   mimetype
    #   url
    # }
    # parterAgreementDoc {
    #   id: filename
    #   filename
    #   mimetype
    #   url
    # }
  }
`;
