import {ApolloLink} from 'apollo-link';

// AUTH MIDDLEWARE
// ================================================
// add some middleware for adding auth to headers
const authLink = new ApolloLink((operation, forward) => {
  const token = window.localStorage['arrow_access_token']; // from local storage

  operation.setContext(() => ({
    headers: {
      Authorization: token,
    },
  }));

  return forward(operation);
});

export default authLink;
