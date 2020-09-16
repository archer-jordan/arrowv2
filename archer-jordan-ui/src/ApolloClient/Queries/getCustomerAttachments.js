// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import attachmentFragment from 'ApolloClient/Fragments/attachmentFragment';

export default gql`
  query getCustomerAttachments($type: AttachmentType!) {
    getCustomerAttachments(type: $type) {
      ...attachmentFragment
    }
  }
  ${attachmentFragment}
`;
