// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  query supportMessages(
    $skip: Int
    $limit: Int
    $status: String
    $customerId: String
    $searchText: String
    $messageType: String
  ) {
    supportMessages(
      skip: $skip
      limit: $limit
      status: $status
      customerId: $customerId
      searchText: $searchText
      messageType: $messageType
    ) {
      supportMessages {
        id
        __typename
        name
        email
        subject
        message
        userId
        createdAt
        messageType
        status
        customer {
          id
          assignedId
          title
        }
      }
      count
    }
  }
`;
