// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation updateCustomerReferralPartner(
    $customerId: ID!
    $referralPartnerId: ID!
    $referralStartDate: String!
    $referralEndDate: String!
  ) {
    updateCustomerReferralPartner(
      customerId: $customerId
      referralPartnerId: $referralPartnerId
      referralStartDate: $referralStartDate
      referralEndDate: $referralEndDate
    ) {
      success
      errors
    }
  }
`;
