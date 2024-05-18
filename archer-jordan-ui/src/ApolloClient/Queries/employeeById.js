// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import employeeFragment from 'ApolloClient/Fragments/employeeFragment';

export default gql`
  query employeeById($id: ID!) {
    employeeById(id: $id) {
      ...employeeFragment
      customer {
        id
        planType
        enrollmentWindowStart
        enrollmentWindowEnd
      }
    }
  }
  ${employeeFragment}
`;
