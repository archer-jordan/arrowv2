// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import referralPartnerFragment from 'ApolloClient/Fragments/referralPartnerFragment';

export default gql`
  query referralProfile {
    currentUser {
      id
      __typename
      referralProfile {
        ...referralPartnerFragment
        customers {
          id
          title
          referralStartDate
          referralEndDate
        }
      }
    }
  }
  ${referralPartnerFragment}
`;
