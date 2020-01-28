// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation updateSupportStatus($id: String!, $status: String!) {
    updateSupportStatus(id: $id, status: $status) {
      id
      name
      email
      subject
      message
      userId
      createdAt
      messageType
      status
    }
  }
`;
