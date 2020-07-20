// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import attachmentFragment from 'ApolloClient/Fragments/attachmentFragment';

export default gql`
  query getAttachments(
    $customerId: ID!
    $type: AttachmentType
    $searchText: String
    $sortBy: DocSortByEnum
  ) {
    getAttachments(
      customerId: $customerId
      type: $type
      searchText: $searchText
      sortBy: $sortBy
    ) {
      ...attachmentFragment
    }
  }
  ${attachmentFragment}
`;
