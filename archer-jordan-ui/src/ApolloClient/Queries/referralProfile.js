// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  query referralProfile {
    referralProfile: currentUser {
      referralProfile {
        id
        __typename
        # firstName
        # lastName
        # applicationSubmittedDate
        # phone
        # partnerType
        # status
      }
    }
  }
`;
