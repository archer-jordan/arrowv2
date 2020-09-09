// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation saveSystemSettings($referralRate: Int, $minimumReferralHours: Int) {
    saveSystemSettings(
      referralRate: $referralRate
      minimumReferralHours: $minimumReferralHours
    ) {
      id
    }
  }
`;
