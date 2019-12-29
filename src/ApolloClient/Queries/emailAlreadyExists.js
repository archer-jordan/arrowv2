// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  query emailAlreadyExists($email: String!) {
    emailAlreadyExists(email: $email) {
      exists
      errors
    }
  }
`;
