// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  fragment userFragment on UserProfile {
    id
    email
    roles
    title
    phone
    firstName
    permissions
    lastName
    createdAt
    employeeId
  }
`;
