// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import attachmentFragment from 'ApolloClient/Fragments/attachmentFragment';

export default gql`
  query getAttachment($customerId: ID!, $type: AttachmentType) {
    getAttachment(customerId: $customerId, type: $type) {
      ...attachmentFragment
    }
  }
  ${attachmentFragment}
`;
