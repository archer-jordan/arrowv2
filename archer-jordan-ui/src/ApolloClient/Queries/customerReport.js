// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import customerReportFragment from 'ApolloClient/Fragments/customerReportFragment';

export default gql`
  query customerReport($month: String!, $year: String!, $customerId: ID!) {
    customerReport(month: $month, year: $year, customerId: $customerId) {
      ...customerReportFragment
    }
  }
  ${customerReportFragment}
`;
