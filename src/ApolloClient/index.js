import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch'; // https://github.com/apollographql/apollo-link/issues/513#issuecomment-368234260
import apolloLogger from 'apollo-link-logger';
import {authLink, httpLink} from './links';
import errorLink from './links/errorLink';
import {createUploadLink} from 'apollo-upload-client';

// create apollo cache and setup normalization features with dataIdFromObject
const cache = new InMemoryCache({});

const uploadLink = createUploadLink({
  uri: !process.env.REACT_APP_API_HOST
    ? 'http://10.0.0.133:3000/graphql'
    : process.env.REACT_APP_API_HOST, // Apollo Server is served from port 4000
  headers: {
    'keep-alive': 'true',
  },
});

let links = [authLink, uploadLink, errorLink, httpLink];

if (process.env.NODE_ENV === 'development') {
  links = [authLink, uploadLink, apolloLogger, errorLink, httpLink];
}

// create apollo-client instance
const client = new ApolloClient({
  link: ApolloLink.from(links),
  fetch,
  cache,
  connectToDevTools: process.env.NODE_ENV === 'development',
});

// export the client to be used by the app
export default client;
