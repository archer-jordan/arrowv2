// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import userFragment from 'ApolloClient/Fragments/userFragment';

export default gql`
  query currentUser {
    currentUser {
      ...userFragment
      customerId
      companyStatus
      company {
        id
        title
      }
    }
  }
  ${userFragment}
`;
