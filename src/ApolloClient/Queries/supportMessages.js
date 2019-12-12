// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  query supportMessages {
    supportMessages {
      id
      name
      email
      subject
      message
      userId
      createdAt
    }
  }
`;
