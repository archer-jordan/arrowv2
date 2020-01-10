// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import userFragment from 'ApolloClient/Fragments/userFragment';

export default gql`
  query customerAdmins($customerId: ID!) {
    customerAdmins(customerId: $customerId) {
      ...userFragment
    }
  }
  ${userFragment}
`;
