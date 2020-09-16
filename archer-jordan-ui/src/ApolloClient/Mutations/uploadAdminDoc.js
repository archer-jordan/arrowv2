// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation uploadAdminDoc($file: Upload!) {
    uploadAdminDoc(file: $file) {
      id
      filename
      mimetype
      url
    }
  }
`;
