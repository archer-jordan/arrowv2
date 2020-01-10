// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  fragment attachmentFragment on Attachment {
    id
    filename
    url
    customerId
    key
    type
  }
`;
