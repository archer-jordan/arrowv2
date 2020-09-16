// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation saveReferralPartner($id: ID!, $params: ReferralPartnerParams) {
    saveReferralPartner(id: $id, params: $params) {
      id
    }
  }
`;
