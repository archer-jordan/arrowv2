// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation registerAccount($email: String!) {
    registerAccount(email: $email) {
      success
    }
  }
`;
