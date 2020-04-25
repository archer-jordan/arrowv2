import {ApolloLink} from 'apollo-link';
import jwtDecode from 'jwt-decode';
import constants from 'lib/constants';
import client from '../index';
import gql from 'graphql-tag';
import {Observable} from 'apollo-link';

const isTokenExpired = (token) => {
  const currentTime = Date.now() / 1000;
  const decodedToken = jwtDecode(token);
  return decodedToken.exp < currentTime;
};

const refreshTokensMutation = gql`
  mutation refreshTokens($accessToken: String!, $refreshToken: String!) {
    refreshTokens(accessToken: $accessToken, refreshToken: $refreshToken) {
      sessionId
      tokens {
        refreshToken
        accessToken
      }
    }
  }
`;

const WHITE_LIST_OPERATIONS = ['refreshTokens'];

const tokensAreInResponse = (res) => {
  return (
    res.data.refreshTokens.tokens.accessToken &&
    res.data.refreshTokens.tokens.refreshToken
  );
};

// AUTH MIDDLEWARE
// ================================================
// add some middleware for adding auth to headers
const authLink = new ApolloLink((operation, forward) => {
  // if the operation we're doing is a refreshTokens, then we can let the mutation happen even without a token
  if (WHITE_LIST_OPERATIONS.includes(operation.operationName)) {
    operation.setContext(({headers = {}}) => ({
      headers: {
        ...headers,
        Authorization: null,
      },
    }));

    return forward(operation);
  }

  // if it's not a refresh token, then we'll conintue on
  try {
    const token = window.localStorage[constants.authTokenName]; // from local storage
    const isAccessTokenExpired = token && isTokenExpired(token);
    const refreshToken = window.localStorage[constants.refreshTokenName];
    const isRefreshTokenExpired = refreshToken && isTokenExpired(refreshToken);
    /*
      IF THE TOKEN IS NOT EXPIRED, WE SIMPLY ADD THE TOKEN TO HEADERS AND FORWARD TO THE NEXT LINK
    */

    if (!token && !refreshToken) {
      console.log('neither token exists');
      operation.setContext(() => ({
        headers: {
          Authorization: null,
        },
      }));
      return forward(operation);
    }

    if (!isAccessTokenExpired) {
      console.log('access token is good');
      operation.setContext(() => ({
        headers: {
          Authorization: token,
        },
      }));
      return forward(operation);
    }

    if (
      token &&
      isAccessTokenExpired &&
      refreshToken &&
      isRefreshTokenExpired
    ) {
      console.log('all tokens are expired');
      operation.setContext(() => ({
        headers: {
          Authorization: null,
        },
      }));
      return forward(operation);
    }
    /*
      IF THE TOKEN IS EXPIRED, WE CHECK TO SEE IF THE REFRESH TOKEN IS EXPIRED TOO
    */
    if (
      token &&
      isAccessTokenExpired &&
      refreshToken &&
      !isRefreshTokenExpired
    ) {
      console.log(
        '=======> access token is expired but refresh token is still good'
      );
      return new Observable(async (observer) => {
        // Call mutation to refresh token
        let res;
        try {
          res = await client.mutate({
            mutation: refreshTokensMutation,
            variables: {
              accessToken: token,
              refreshToken,
            },
          });
        } catch (err) {
          console.log('=====> error trying to refresh');
        }

        if (tokensAreInResponse(res)) {
          window.localStorage.setItem(
            constants.authTokenName,
            res.data.refreshTokens.tokens.accessToken
          );
          window.localStorage.setItem(
            constants.refreshTokenName,
            res.data.refreshTokens.tokens.refreshToken
          );

          operation.setContext(({headers = {}}) => ({
            headers: {
              ...headers,
              Authorization: res.data.refreshTokens.tokens.accessToken,
            },
          }));

          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          };
          // Retry last failed request
          return forward(operation).subscribe(subscriber);
        }

        // if tokens are not in the response, lets just remove the auth header and forward to the next link
        if (!tokensAreInResponse(res)) {
          console.log('tokens are not in response');
          operation.setContext(({headers = {}}) => ({
            headers: {
              ...headers,
              Authorization: null,
            },
          }));
          return forward(operation);
        }
      });
    }
  } catch (err) {
    console.log('====> caught an error');
    console.log(err && err.message);
    operation.setContext(({headers = {}}) => ({
      headers: {
        ...headers,
        Authorization: null,
      },
    }));
    return forward(operation);
  }
});

export default authLink;
