// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import customerFragment from 'ApolloClient/Fragments/customerFragment';

export default gql`
  query customerById($id: ID!) {
    customerById(id: $id) {
      ...customerFragment
    }
  }
  ${customerFragment}
`;
