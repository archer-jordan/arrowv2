// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import userFragment from 'ApolloClient/Fragments/userFragment';

// creates a new user in firebase and then inserts a new UserProfile in mongodb
export default gql`
  mutation createNewUser($params: UserParams) {
    createNewUser(params: $params) {
      ...userFragment
    }
  }
  ${userFragment}
`;
