// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import attachmentFragment from 'ApolloClient/Fragments/attachmentFragment';

export default gql`
  query getAttachments($customerId: ID!, $type: AttachmentType) {
    getAttachments(customerId: $customerId, type: $type) {
      ...attachmentFragment
    }
  }
  ${attachmentFragment}
`;
