// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import offerFragment from 'ApolloClient/Fragments/offerFragment';

// creates a new user in firebase and then inserts a new UserProfile in mongodb
export default gql`
  mutation acceptOffer($offerId: ID!) {
    acceptOffer(offerId: $offerId) {
      ...offerFragment
    }
  }
  ${offerFragment}
`;
