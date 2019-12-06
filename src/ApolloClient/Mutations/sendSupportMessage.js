// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation sendSupportMessage($params: SupportMessageParams) {
    sendSupportMessage(params: $params) {
      success
      errors
    }
  }
`;
