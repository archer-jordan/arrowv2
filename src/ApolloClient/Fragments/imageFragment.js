// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  fragment imageFragment on Image {
    url
    thumbnailUrl
    title
    description
    fileType
    base64
    filename
  }
`;
