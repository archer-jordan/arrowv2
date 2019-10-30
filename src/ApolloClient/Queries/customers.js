// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import customerFragment from 'ApolloClient/Fragments/customerFragment';

export default gql`
  query customers {
    customers {
      count
      customers {
        ...customerFragment
      }
    }
  }
  ${customerFragment}
`;
