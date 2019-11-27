// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import attachmentFragment from 'ApolloClient/Fragments/attachmentFragment';

export default gql`
  mutation saveAttachment($id: ID, $params: AttachmentParams) {
    saveAttachment(id: $id, params: $params) {
      ...attachmentFragment
    }
  }
  ${attachmentFragment}
`;
