// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation sendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email)
  }
`;
