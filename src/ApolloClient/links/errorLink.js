import { onError } from 'apollo-link-error';
import { Observable } from 'apollo-link'; // <-- Add Observable

const errorLink = onError(
  ({ graphQLErrors, networkError, response, operation, forward }) => {
    if (
      networkError &&
      networkError.statusCode &&
      (networkError.statusCode === 401 || networkError.statusCode === 500)
    ) {
      // remove cached token on 401 from the server
      window.localStorage.removeItem('moafly_access_token');
    }

    let accessToken = window.localStorage.getItem('moafly_access_token');

    if (graphQLErrors && graphQLErrors[0]) {
      // User access token has expired
      if (graphQLErrors[0].message.includes('No login token was passed')) {
        window.localStorage.removeItem('moafly_access_token');
        return null;
      }
      if (graphQLErrors[0].message.includes('Token has expired')) {
        // let's remove the old token

        // We assume we have both tokens needed to run the async request
        if (accessToken && accessToken !== 'undefined') {
          window.localStorage.removeItem('moafly_access_token');
          console.log('attempting a refresh....');
          // Let's refresh token through async request
          return new Observable(observer => {
            try {
            } catch (err) {
              console.log('catch...');

              console.log(err);
            }
          });
        }
      }
    }
  }
);

export default errorLink;
