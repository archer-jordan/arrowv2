// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation authenticate($params: AuthenticateParamsInput!) {
    authenticate(serviceName: "password", params: $params) {
      sessionId
      tokens {
        refreshToken
        accessToken
      }
    }
  }
`;
