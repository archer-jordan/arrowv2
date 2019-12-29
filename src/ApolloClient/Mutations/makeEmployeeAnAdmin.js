// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation makeEmployeeAnAdmin($email: String!) {
    makeEmployeeAnAdmin(email: $email) {
      success
    }
  }
`;
