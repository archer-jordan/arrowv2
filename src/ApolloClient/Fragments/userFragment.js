// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import imageFragment from 'ApolloClient/Fragments/imageFragment';

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
    image {
      ...imageFragment
    }
  }
  ${imageFragment}
`;
