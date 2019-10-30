import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch'; // https://github.com/apollographql/apollo-link/issues/513#issuecomment-368234260
import apolloLogger from 'apollo-link-logger';
import { authLink, httpLink } from './links';
import errorLink from './links/errorLink';

// create apollo cache and setup normalization features with dataIdFromObject
const cache = new InMemoryCache({});

let links = [authLink, errorLink, httpLink];

if (process.env.NODE_ENV === 'development') {
  links = [authLink, apolloLogger, errorLink, httpLink];
}

// create apollo-client instance
const client = new ApolloClient({
  link: ApolloLink.from(links),
  fetch,
  cache,
  connectToDevTools: process.env.NODE_ENV === 'development'
});

// export the client to be used by the app
export default client;
