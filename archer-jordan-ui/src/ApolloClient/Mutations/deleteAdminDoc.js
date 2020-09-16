// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation deleteAdminDoc($id: ID!) {
    deleteAdminDoc(id: $id) {
      success
      errors
    }
  }
`;
