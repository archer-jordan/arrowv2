import {ApolloLink} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import ApolloLinkTimeout from 'apollo-link-timeout';

// HTTP LINK
// ================================================
// set up apollo link over http

export const httpLink = new HttpLink({
  uri: !process.env.REACT_APP_API_HOST
    ? 'http://10.0.0.133:3000/graphql'
    : process.env.REACT_APP_API_HOST, // 'https://heyned.meteorapp.com/graphql',
});

console.log(
  !process.env.REACT_APP_API_HOST
    ? 'http://localhost:3000/graphql'
    : process.env.REACT_APP_API_HOST
);

// AUTH MIDDLEWARE
// ================================================
// add some middleware for adding auth to headers
export const authLink = new ApolloLink((operation, forward) => {
  const token = window.localStorage['arrow_access_token']; // from local storage

  operation.setContext(() => ({
    headers: {
      Authorization: token,
    },
  }));

  return forward(operation);
});

// TIMEOUT LINK
// ================================================
// NOTE: if you want batch http needs to be turned on server-side: https://github.com/graphql-python/graphene-django/issues/215
// const httpLink = new BatchHttpLink({ uri: '/graphql', credentials: 'include' });
export const timeoutLink = new ApolloLinkTimeout(20000); // 20 second timeout
