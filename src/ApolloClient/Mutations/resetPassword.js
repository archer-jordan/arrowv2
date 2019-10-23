// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation resetPassword($newPassword: String!, $token: String!) {
    resetPassword(newPassword: $newPassword, token: $token) {
      sessionId
      tokens {
        refreshToken
        accessToken
      }
    }
  }
`;
