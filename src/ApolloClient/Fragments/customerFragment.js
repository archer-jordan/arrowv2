// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  fragment customerFragment on Customer {
    id
    title
  }
`;
