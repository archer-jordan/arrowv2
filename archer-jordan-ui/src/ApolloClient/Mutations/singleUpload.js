// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      url
      key
    }
  }
`;
