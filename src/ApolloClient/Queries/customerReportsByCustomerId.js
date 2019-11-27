// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import customerReportFragment from 'ApolloClient/Fragments/customerReportFragment';

export default gql`
  query customerReportsByCustomerId($customerId: ID!) {
    customerReportsByCustomerId(customerId: $customerId) {
      ...customerReportFragment
    }
  }
  ${customerReportFragment}
`;
