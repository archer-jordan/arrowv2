// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation updateCustomerReferralPartner(
    $customerId: ID!
    $referralPartnerId: ID!
    $referralStartDate: String!
    $referralEndDate: String!
    $minimumReferralHours: Int
    $referralRate: Int
  ) {
    updateCustomerReferralPartner(
      customerId: $customerId
      referralPartnerId: $referralPartnerId
      referralStartDate: $referralStartDate
      referralEndDate: $referralEndDate
      minimumReferralHours: $minimumReferralHours
      referralRate: $referralRate
    ) {
      success
      errors
    }
  }
`;
