// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import referralPartnerFragment from 'ApolloClient/Fragments/referralPartnerFragment';

export default gql`
  query referralPartnerById($id: ID!) {
    referralPartnerById(id: $id) {
      ...referralPartnerFragment
      customers {
        id
        title
        referralStartDate
        referralEndDate
      }
    }
  }
  ${referralPartnerFragment}
`;
