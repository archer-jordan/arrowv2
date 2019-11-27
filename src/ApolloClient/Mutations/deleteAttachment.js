// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation deleteAttachment($id: ID!) {
    deleteAttachment(id: $id) {
      success
    }
  }
`;
