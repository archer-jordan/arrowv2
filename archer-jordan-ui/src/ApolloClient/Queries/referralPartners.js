// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import userFragment from 'ApolloClient/Fragments/userFragment';
import referralPartnerFragment from 'ApolloClient/Fragments/referralPartnerFragment';

export default gql`
  query referralPartners($roles: [String], $searchText: String, $limit: Int) {
    referralPartners: users(
      roles: $roles
      searchText: $searchText
      limit: $limit
    ) {
      count
      users {
        ...userFragment
        createdByEmail
        referralProfile {
          ...referralPartnerFragment
        }
      }
    }
  }
  ${userFragment}
  ${referralPartnerFragment}
`;
