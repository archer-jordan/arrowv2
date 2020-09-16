// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  query systemSettings {
    systemSettings {
      id
      minimumReferralHours
      referralRate
    }
  }
`;
