import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch'; // https://github.com/apollographql/apollo-link/issues/513#issuecomment-368234260
// LINKS
import {ApolloLink} from 'apollo-link';
import apolloLogger from 'apollo-link-logger';
import authLink from './links/authLink';
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

console.log(
  !process.env.REACT_APP_API_HOST
    ? 'http://localhost:3000/graphql'
    : process.env.REACT_APP_API_HOST
);

// normally we need apollo-http-link, but apollo-upload-client will handle that for us in addition to uploads
let links = [authLink, errorLink, uploadLink];

// if we're in development mode, we'll add apolloLogger so we can see queries/mutations logged in the console
if (process.env.NODE_ENV === 'development') {
  links = [authLink, apolloLogger, errorLink, uploadLink];
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
