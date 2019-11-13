// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  query customerIdAlreadyExists($assignedId: String!) {
    customerIdAlreadyExists(assignedId: $assignedId) {
      exists
    }
  }
`;
