// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation referralSignup($email: String!) {
    referralSignup(email: $email) {
      success
      errors
    }
  }
`;
